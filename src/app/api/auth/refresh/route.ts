import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/db/mongodb';
import { COLLECTIONS, IUser, UserModel } from '@/models/User';
import { verifyRefreshToken, generateAccessToken, generateRefreshToken } from '@/lib/auth/jwt';
import { withRateLimit, RATE_LIMITS } from '@/lib/middleware/rateLimit';
import { asyncHandler, successResponse, AuthenticationError } from '@/lib/middleware/errorHandler';
import { setCache } from '@/lib/db/redis';
import { ObjectId } from 'mongodb';

async function refreshHandler(request: NextRequest): Promise<NextResponse> {
  const body = await request.json();
  const { refreshToken } = body;

  if (!refreshToken) {
    throw new AuthenticationError('Refresh token required');
  }

  // Verify refresh token
  const decoded = verifyRefreshToken(refreshToken);
  if (!decoded) {
    throw new AuthenticationError('Invalid or expired refresh token');
  }

  // Get database
  const db = await getDatabase();
  const usersCollection = db.collection<IUser>(COLLECTIONS.USERS);
  const sessionsCollection = db.collection(COLLECTIONS.SESSIONS);

  // Find user
  const user = await usersCollection.findOne({ _id: new ObjectId(decoded.userId) });
  if (!user) {
    throw new AuthenticationError('User not found');
  }

  // Check if user is active
  if (!user.isActive) {
    throw new AuthenticationError('User account is deactivated');
  }

  // Verify session exists
  const session = await sessionsCollection.findOne({ refreshToken });
  if (!session) {
    throw new AuthenticationError('Session not found');
  }

  // Generate new tokens
  const newAccessToken = generateAccessToken({
    userId: user._id!.toString(),
    email: user.email,
    role: user.role,
  });

  const newRefreshToken = generateRefreshToken({
    userId: user._id!.toString(),
    email: user.email,
    role: user.role,
  });

  // Update session with new refresh token
  await sessionsCollection.updateOne(
    { refreshToken },
    {
      $set: {
        refreshToken: newRefreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      },
    }
  );

  // Update user's refresh token
  await usersCollection.updateOne(
    { _id: user._id },
    {
      $set: { refreshToken: newRefreshToken },
    }
  );

  // Update cached user data
  await setCache(
    `user:${user._id!.toString()}`,
    UserModel.sanitizeUser(user),
    3600
  );

  return successResponse(
    {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    },
    'Tokens refreshed successfully'
  );
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  return withRateLimit(request, RATE_LIMITS.API, (req) =>
    asyncHandler(refreshHandler)(req)
  );
}