import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/db/mongodb';
import { COLLECTIONS, IUser, UserModel, USER_INDEXES } from '@/models/User';
import { hashPassword } from '@/lib/auth/password';
import { generateAccessToken, generateRefreshToken, generateEmailVerificationToken } from '@/lib/auth/jwt';
import { validateRegistration, validationErrorResponse } from '@/lib/middleware/validation';
import { withRateLimit, RATE_LIMITS } from '@/lib/middleware/rateLimit';
import { asyncHandler, successResponse, ConflictError } from '@/lib/middleware/errorHandler';
import { setCache } from '@/lib/db/redis';

async function registerHandler(request: NextRequest): Promise<NextResponse> {
  const body = await request.json();

  // Validate input
  const validationErrors = validateRegistration(body);
  if (validationErrors.length > 0) {
    return validationErrorResponse(validationErrors);
  }

  const { name, email, password, phone, role = 'Customer' } = body;

  // Get database
  const db = await getDatabase();
  const usersCollection = db.collection<IUser>(COLLECTIONS.USERS);

  // Create indexes if they don't exist
  try {
    for (const index of USER_INDEXES) {
      await usersCollection.createIndex(index.key as any, {
        unique: index.unique,
        sparse: index.sparse,
      });
    }
  } catch (error) {
    console.error('Index creation error:', error);
  }

  // Check if user already exists
  const existingUser = await usersCollection.findOne({ email });
  if (existingUser) {
    throw new ConflictError('User with this email already exists');
  }

  // Hash password
  const hashedPassword = await hashPassword(password);

  // Generate email verification token
  const emailVerificationToken = generateEmailVerificationToken(email);
  const emailVerificationExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

  // Create user
  const newUser = UserModel.createUser({
    name,
    email,
    password: hashedPassword,
    phone,
    role,
    emailVerificationToken,
    emailVerificationExpiry,
  });

  // Insert user
  const result = await usersCollection.insertOne(newUser);
  const insertedUser = await usersCollection.findOne({ _id: result.insertedId });

  if (!insertedUser) {
    throw new Error('Failed to create user');
  }

  // Generate tokens
  const accessToken = generateAccessToken({
    userId: insertedUser._id!.toString(),
    email: insertedUser.email,
    role: insertedUser.role,
  });

  const refreshToken = generateRefreshToken({
    userId: insertedUser._id!.toString(),
    email: insertedUser.email,
    role: insertedUser.role,
  });

  // Cache user data
  await setCache(
    `user:${insertedUser._id!.toString()}`,
    UserModel.sanitizeUser(insertedUser),
    3600
  );

  // TODO: Send verification email
  console.log('Email verification token:', emailVerificationToken);
  console.log('Verification URL:', `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${emailVerificationToken}`);

  return successResponse(
    {
      user: UserModel.sanitizeUser(insertedUser),
      tokens: {
        accessToken,
        refreshToken,
      },
    },
    'User registered successfully. Please verify your email.',
    201
  );
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  return withRateLimit(request, RATE_LIMITS.AUTH, (req) =>
    asyncHandler(registerHandler)(req)
  );
}