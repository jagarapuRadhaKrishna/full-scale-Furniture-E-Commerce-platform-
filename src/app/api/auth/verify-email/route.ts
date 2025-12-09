import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/db/mongodb';
import { COLLECTIONS, IUser } from '@/models/User';
import { verifyAccessToken } from '@/lib/auth/jwt';
import { asyncHandler, successResponse, AuthenticationError, NotFoundError } from '@/lib/middleware/errorHandler';

async function verifyEmailHandler(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');

  if (!token) {
    throw new AuthenticationError('Verification token required');
  }

  // Verify token
  const decoded = verifyAccessToken(token);
  if (!decoded || !decoded.email) {
    throw new AuthenticationError('Invalid or expired verification token');
  }

  // Get database
  const db = await getDatabase();
  const usersCollection = db.collection<IUser>(COLLECTIONS.USERS);

  // Find user by email and token
  const user = await usersCollection.findOne({
    email: decoded.email,
    emailVerificationToken: token,
  });

  if (!user) {
    throw new NotFoundError('User not found or token mismatch');
  }

  // Check if already verified
  if (user.isVerified) {
    return successResponse(null, 'Email already verified');
  }

  // Check if token expired
  if (user.emailVerificationExpiry && new Date() > user.emailVerificationExpiry) {
    throw new AuthenticationError('Verification token has expired');
  }

  // Update user as verified
  await usersCollection.updateOne(
    { _id: user._id },
    {
      $set: {
        isVerified: true,
        emailVerificationToken: null,
        emailVerificationExpiry: null,
      },
    }
  );

  return successResponse(
    { email: user.email },
    'Email verified successfully'
  );
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  return asyncHandler(verifyEmailHandler)(request);
}
