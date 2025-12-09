import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/db/mongodb';
import { COLLECTIONS, IUser } from '@/models/User';
import { generatePasswordResetToken } from '@/lib/auth/jwt';
import { isValidEmail, validationErrorResponse } from '@/lib/middleware/validation';
import { withRateLimit, RATE_LIMITS } from '@/lib/middleware/rateLimit';
import { asyncHandler, successResponse, NotFoundError } from '@/lib/middleware/errorHandler';

async function forgotPasswordHandler(request: NextRequest): Promise<NextResponse> {
  const body = await request.json();
  const { email } = body;

  // Validate email
  if (!email || !isValidEmail(email)) {
    return validationErrorResponse([
      { field: 'email', message: 'Valid email is required' },
    ]);
  }

  // Get database
  const db = await getDatabase();
  const usersCollection = db.collection<IUser>(COLLECTIONS.USERS);

  // Find user
  const user = await usersCollection.findOne({ email });
  if (!user) {
    // Don't reveal if user exists - security best practice
    return successResponse(
      null,
      'If an account exists with this email, a password reset link has been sent'
    );
  }

  // Generate password reset token
  const passwordResetToken = generatePasswordResetToken({ email: user.email });
  const passwordResetExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

  // Update user with reset token
  await usersCollection.updateOne(
    { _id: user._id },
    {
      $set: {
        passwordResetToken,
        passwordResetExpiry,
      },
    }
  );

  // TODO: Send password reset email
  console.log('Password reset token:', passwordResetToken);
  console.log('Reset URL:', `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${passwordResetToken}`);

  return successResponse(
    null,
    'If an account exists with this email, a password reset link has been sent'
  );
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  return withRateLimit(request, RATE_LIMITS.PASSWORD_RESET, (req) =>
    asyncHandler(forgotPasswordHandler)(req)
  );
}
