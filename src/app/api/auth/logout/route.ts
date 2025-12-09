import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/db/mongodb';
import { COLLECTIONS } from '@/models/User';
import { requireAuth } from '@/lib/middleware/auth';
import { asyncHandler, successResponse } from '@/lib/middleware/errorHandler';
import { deleteCache } from '@/lib/db/redis';

async function logoutHandler(request: NextRequest, user: any): Promise<NextResponse> {
  const db = await getDatabase();
  const usersCollection = db.collection(COLLECTIONS.USERS);
  const sessionsCollection = db.collection(COLLECTIONS.SESSIONS);

  // Get refresh token from body
  const body = await request.json();
  const { refreshToken } = body;

  // Delete session
  if (refreshToken) {
    await sessionsCollection.deleteOne({ refreshToken });
  }

  // Clear user's refresh token
  await usersCollection.updateOne(
    { _id: user._id },
    {
      $unset: { refreshToken: '' },
    }
  );

  // Clear cached user data
  await deleteCache(`user:${user._id.toString()}`);

  return successResponse(null, 'Logout successful');
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  return requireAuth(request, (req, user) => asyncHandler(logoutHandler)(req, user));
}