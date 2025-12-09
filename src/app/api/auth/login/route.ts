import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/db/mongodb';
import { COLLECTIONS, IUser, UserModel, SESSION_INDEXES, SessionModel } from '@/models/User';
import { comparePassword } from '@/lib/auth/password';
import { generateAccessToken, generateRefreshToken } from '@/lib/auth/jwt';
import { validateLogin, validationErrorResponse } from '@/lib/middleware/validation';
import { withRateLimit, RATE_LIMITS } from '@/lib/middleware/rateLimit';
import { asyncHandler, successResponse, AuthenticationError } from '@/lib/middleware/errorHandler';
import { setCache } from '@/lib/db/redis';

async function loginHandler(request: NextRequest): Promise<NextResponse> {
  const body = await request.json();

  // Validate input
  const validationErrors = validateLogin(body);
  if (validationErrors.length > 0) {
    return validationErrorResponse(validationErrors);
  }

  const { email, password } = body;

  // Get database
  const db = await getDatabase();
  const usersCollection = db.collection<IUser>(COLLECTIONS.USERS);
  const sessionsCollection = db.collection(COLLECTIONS.SESSIONS);

  // Create session indexes if they don't exist
  try {
    for (const index of SESSION_INDEXES) {
      const options: any = {};
      if (index.unique) options.unique = index.unique;
      if (index.expireAfterSeconds !== undefined) options.expireAfterSeconds = index.expireAfterSeconds;
      await sessionsCollection.createIndex(index.key as any, options);
    }
  } catch (error) {
    console.error('Session index creation error:', error);
  }

  // Find user
  const user = await usersCollection.findOne({ email });
  if (!user) {
    throw new AuthenticationError('Invalid email or password');
  }

  // Check if user is active
  if (!user.isActive) {
    throw new AuthenticationError('Your account has been deactivated');
  }

  // Verify password
  const isPasswordValid = await comparePassword(password, user.password);
  if (!isPasswordValid) {
    throw new AuthenticationError('Invalid email or password');
  }

  // Generate tokens
  const accessToken = generateAccessToken({
    userId: user._id!.toString(),
    email: user.email,
    role: user.role,
  });

  const refreshToken = generateRefreshToken({
    userId: user._id!.toString(),
    email: user.email,
    role: user.role,
  });

  // Get device info
  const userAgent = request.headers.get('user-agent') || 'Unknown';
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'Unknown';

  // Create session
  const session = SessionModel.createSession({
    userId: user._id!,
    refreshToken,
    deviceInfo: {
      userAgent,
      ip,
      device: userAgent.includes('Mobile') ? 'Mobile' : 'Desktop',
    },
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
  });

  await sessionsCollection.insertOne(session);

  // Update user's refresh token and last login
  await usersCollection.updateOne(
    { _id: user._id },
    {
      $set: {
        refreshToken,
        lastLogin: new Date(),
      },
    }
  );

  // Cache user data
  await setCache(
    `user:${user._id!.toString()}`,
    UserModel.sanitizeUser(user),
    3600
  );

  return successResponse(
    {
      user: UserModel.sanitizeUser(user),
      tokens: {
        accessToken,
        refreshToken,
      },
    },
    'Login successful'
  );
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  return withRateLimit(request, RATE_LIMITS.AUTH, (req) =>
    asyncHandler(loginHandler)(req)
  );
}