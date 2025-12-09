import { NextRequest, NextResponse } from 'next/server';
import { verifyAccessToken } from '@/lib/auth/jwt';
import { getDatabase } from '@/lib/db/mongodb';
import { COLLECTIONS, IUser } from '@/models/User';
import { ObjectId } from 'mongodb';

export interface AuthRequest extends NextRequest {
  user?: IUser;
}

/**
 * Middleware to authenticate user using JWT token
 */
export async function authenticateToken(request: NextRequest): Promise<{
  authenticated: boolean;
  user?: IUser;
  error?: string;
}> {
  try {
    // Get token from Authorization header
    const authHeader = request.headers.get('authorization');
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return {
        authenticated: false,
        error: 'Access token required',
      };
    }

    // Verify token
    const decoded = verifyAccessToken(token);
    if (!decoded) {
      return {
        authenticated: false,
        error: 'Invalid or expired token',
      };
    }

    // Get user from database
    const db = await getDatabase();
    const user = await db
      .collection<IUser>(COLLECTIONS.USERS)
      .findOne({ _id: new ObjectId(decoded.userId) });

    if (!user) {
      return {
        authenticated: false,
        error: 'User not found',
      };
    }

    // Check if user is active
    if (!user.isActive) {
      return {
        authenticated: false,
        error: 'User account is deactivated',
      };
    }

    return {
      authenticated: true,
      user,
    };
  } catch (error) {
    console.error('Authentication error:', error);
    return {
      authenticated: false,
      error: 'Authentication failed',
    };
  }
}

/**
 * Middleware to require authentication
 * Returns 401 if not authenticated
 */
export async function requireAuth(
  request: NextRequest,
  handler: (req: NextRequest, user: IUser) => Promise<NextResponse>
): Promise<NextResponse> {
  const { authenticated, user, error } = await authenticateToken(request);

  if (!authenticated || !user) {
    return NextResponse.json(
      {
        success: false,
        error: error || 'Unauthorized',
      },
      { status: 401 }
    );
  }

  return handler(request, user);
}

/**
 * Middleware to require specific role(s)
 * Returns 403 if user doesn't have required role
 */
export async function requireRole(
  request: NextRequest,
  allowedRoles: IUser['role'][],
  handler: (req: NextRequest, user: IUser) => Promise<NextResponse>
): Promise<NextResponse> {
  const { authenticated, user, error } = await authenticateToken(request);

  if (!authenticated || !user) {
    return NextResponse.json(
      {
        success: false,
        error: error || 'Unauthorized',
      },
      { status: 401 }
    );
  }

  // Check if user has required role
  if (!allowedRoles.includes(user.role)) {
    return NextResponse.json(
      {
        success: false,
        error: 'Forbidden: Insufficient permissions',
      },
      { status: 403 }
    );
  }

  return handler(request, user);
}

/**
 * Middleware to require Admin role
 */
export async function requireAdmin(
  request: NextRequest,
  handler: (req: NextRequest, user: IUser) => Promise<NextResponse>
): Promise<NextResponse> {
  return requireRole(request, ['Admin'], handler);
}

/**
 * Middleware to require Vendor role
 */
export async function requireVendor(
  request: NextRequest,
  handler: (req: NextRequest, user: IUser) => Promise<NextResponse>
): Promise<NextResponse> {
  return requireRole(request, ['Vendor'], handler);
}

/**
 * Middleware to require Delivery Agent role
 */
export async function requireDelivery(
  request: NextRequest,
  handler: (req: NextRequest, user: IUser) => Promise<NextResponse>
): Promise<NextResponse> {
  return requireRole(request, ['Delivery'], handler);
}

/**
 * Middleware to require Admin or Vendor role
 */
export async function requireAdminOrVendor(
  request: NextRequest,
  handler: (req: NextRequest, user: IUser) => Promise<NextResponse>
): Promise<NextResponse> {
  return requireRole(request, ['Admin', 'Vendor'], handler);
}

/**
 * Extract user from request (for routes that support optional auth)
 */
export async function optionalAuth(request: NextRequest): Promise<IUser | null> {
  const { authenticated, user } = await authenticateToken(request);
  return authenticated && user ? user : null;
}
