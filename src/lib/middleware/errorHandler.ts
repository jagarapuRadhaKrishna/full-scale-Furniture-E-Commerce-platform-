import { NextResponse } from 'next/server';

// Custom error classes
export class AppError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  errors: any[];

  constructor(message: string, errors: any[] = []) {
    super(message, 400);
    this.errors = errors;
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = 'Authentication failed') {
    super(message, 401);
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string = 'Insufficient permissions') {
    super(message, 403);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = 'Resource not found') {
    super(message, 404);
  }
}

export class ConflictError extends AppError {
  constructor(message: string = 'Resource already exists') {
    super(message, 409);
  }
}

export class RateLimitError extends AppError {
  constructor(message: string = 'Too many requests') {
    super(message, 429);
  }
}

/**
 * Global error handler for API routes
 */
export function handleError(error: any): NextResponse {
  // Log error
  console.error('API Error:', {
    message: error.message,
    stack: error.stack,
    statusCode: error.statusCode,
  });

  // Handle known errors
  if (error instanceof AppError) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        ...(error instanceof ValidationError && { errors: error.errors }),
      },
      { status: error.statusCode }
    );
  }

  // Handle MongoDB errors
  if (error.name === 'MongoError' || error.name === 'MongoServerError') {
    if (error.code === 11000) {
      // Duplicate key error
      return NextResponse.json(
        {
          success: false,
          error: 'Resource already exists',
        },
        { status: 409 }
      );
    }
  }

  // Handle JWT errors
  if (error.name === 'JsonWebTokenError') {
    return NextResponse.json(
      {
        success: false,
        error: 'Invalid token',
      },
      { status: 401 }
    );
  }

  if (error.name === 'TokenExpiredError') {
    return NextResponse.json(
      {
        success: false,
        error: 'Token expired',
      },
      { status: 401 }
    );
  }

  // Handle unknown errors
  return NextResponse.json(
    {
      success: false,
      error: 'Internal server error',
      ...(process.env.NODE_ENV === 'development' && {
        message: error.message,
        stack: error.stack,
      }),
    },
    { status: 500 }
  );
}

/**
 * Async error handler wrapper for API routes
 */
export function asyncHandler(
  handler: (req: any, ...args: any[]) => Promise<NextResponse>
) {
  return async (req: any, ...args: any[]): Promise<NextResponse> => {
    try {
      return await handler(req, ...args);
    } catch (error) {
      return handleError(error);
    }
  };
}

/**
 * Success response helper
 */
export function successResponse(
  data: any,
  message: string = 'Success',
  statusCode: number = 200
): NextResponse {
  return NextResponse.json(
    {
      success: true,
      message,
      data,
    },
    { status: statusCode }
  );
}

/**
 * Error response helper
 */
export function errorResponse(
  message: string,
  statusCode: number = 400,
  errors?: any[]
): NextResponse {
  return NextResponse.json(
    {
      success: false,
      error: message,
      ...(errors && { errors }),
    },
    { status: statusCode }
  );
}

/**
 * Pagination response helper
 */
export function paginatedResponse(
  data: any[],
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  },
  message: string = 'Success'
): NextResponse {
  return NextResponse.json({
    success: true,
    message,
    data,
    pagination: {
      page: pagination.page,
      limit: pagination.limit,
      total: pagination.total,
      pages: pagination.pages,
      hasNext: pagination.page < pagination.pages,
      hasPrev: pagination.page > 1,
    },
  });
}
