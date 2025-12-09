import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/db/mongodb';
import { COLLECTIONS, IUser } from '@/models/User';
import { verifyAccessToken } from '@/lib/auth/jwt';
import { hashPassword, validatePasswordStrength } from '@/lib/auth/password';
import { validationErrorResponse } from '@/lib/middleware/validation';
import { asyncHandler, successResponse, AuthenticationError, NotFoundError } from '@/lib/middleware/errorHandler';

async function resetPasswordHandler(request: NextRequest): Promise<NextResponse> {
  const body = await request.json();
  const { token, password } = body;

  if (!token || !password) {
    return validationErrorResponse([
      { field: 'token', message: 'Reset token is required' },
      { field: 'password', message: 'New password is required' },
    ]);
  }

  // Validate password strength
  const passwordValidation = validatePasswordStrength(password);
  if (!passwordValidation.isValid) {
    return validationErrorResponse([
      { field: 'password', message: passwordValidation.errors.join(', ') },
    ]);
  }

  // Verify token
  const decoded = verifyAccessToken(token);
  if (!decoded || !decoded.email) {
    throw new AuthenticationError('Invalid or expired reset token');
  }

  // Get database
  const db = await getDatabase();
  const usersCollection = db.collection<IUser>(COLLECTIONS.USERS);

  // Find user by email and token
  const user = await usersCollection.findOne({
    email: decoded.email,
    passwordResetToken: token,
  });

  if (!user) {
    throw new NotFoundError('User not found or token mismatch');
  }

  // Check if token expired
  if (user.passwordResetExpiry && new Date() > user.passwordResetExpiry) {
    throw new AuthenticationError('Reset token has expired');
  }

  // Hash new password
  const hashedPassword = await hashPassword(password);

  // Update user password and clear reset token
  await usersCollection.updateOne(
    { _id: user._id },
    {
      $set: {
        password: hashedPassword,
        passwordResetToken: null,
        passwordResetExpiry: null,
        refreshToken: null, // Invalidate existing sessions
      },
    }
  );

  // Clear all sessions for this user
  const sessionsCollection = db.collection(COLLECTIONS.SESSIONS);
  await sessionsCollection.deleteMany({ userId: user._id });

  return successResponse(
    null,
    'Password reset successful. Please login with your new password'
  );
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  return asyncHandler(resetPasswordHandler)(request);
}
