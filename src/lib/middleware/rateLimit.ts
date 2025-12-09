import { NextRequest, NextResponse } from 'next/server';
import { getRedisClient } from '@/lib/db/redis';

interface RateLimitConfig {
  windowMs: number; // Time window in milliseconds
  maxRequests: number; // Maximum number of requests per window
  keyPrefix?: string; // Redis key prefix
  skipSuccessfulRequests?: boolean; // Don't count successful requests
}

interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  resetTime: number;
  error?: string;
}

/**
 * Rate limiting middleware using Redis
 */
export async function rateLimit(
  request: NextRequest,
  config: RateLimitConfig
): Promise<RateLimitResult> {
  try {
    const redis = getRedisClient();
    const {
      windowMs,
      maxRequests,
      keyPrefix = 'ratelimit',
      skipSuccessfulRequests = false,
    } = config;

    // Get identifier (IP address or user ID from token)
    const identifier = getIdentifier(request);
    const key = `${keyPrefix}:${identifier}`;

    // Get current count
    const current = await redis.get(key);
    const count = current ? parseInt(current, 10) : 0;

    // Calculate reset time
    const ttl = await redis.ttl(key);
    const resetTime = ttl > 0 ? Date.now() + ttl * 1000 : Date.now() + windowMs;

    // Check if limit exceeded
    if (count >= maxRequests) {
      return {
        success: false,
        limit: maxRequests,
        remaining: 0,
        resetTime,
        error: 'Too many requests, please try again later',
      };
    }

    // Increment counter
    const newCount = await redis.incr(key);

    // Set expiry on first request
    if (newCount === 1) {
      await redis.expire(key, Math.ceil(windowMs / 1000));
    }

    return {
      success: true,
      limit: maxRequests,
      remaining: Math.max(0, maxRequests - newCount),
      resetTime,
    };
  } catch (error) {
    console.error('Rate limit error:', error);
    // On error, allow the request (fail open)
    return {
      success: true,
      limit: config.maxRequests,
      remaining: config.maxRequests,
      resetTime: Date.now() + config.windowMs,
    };
  }
}

/**
 * Get identifier from request (IP or user ID)
 */
function getIdentifier(request: NextRequest): string {
  // Try to get IP address
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown';

  // You can also extract user ID from JWT if available
  // const authHeader = request.headers.get('authorization');
  // if (authHeader) {
  //   const token = authHeader.split(' ')[1];
  //   const decoded = verifyAccessToken(token);
  //   return decoded?.userId || ip;
  // }

  return ip;
}

/**
 * Middleware wrapper for rate limiting
 */
export async function withRateLimit(
  request: NextRequest,
  config: RateLimitConfig,
  handler: (req: NextRequest) => Promise<NextResponse>
): Promise<NextResponse> {
  const result = await rateLimit(request, config);

  // Add rate limit headers
  const headers = {
    'X-RateLimit-Limit': result.limit.toString(),
    'X-RateLimit-Remaining': result.remaining.toString(),
    'X-RateLimit-Reset': new Date(result.resetTime).toISOString(),
  };

  if (!result.success) {
    return NextResponse.json(
      {
        success: false,
        error: result.error,
      },
      { status: 429, headers }
    );
  }

  const response = await handler(request);

  // Add headers to successful response
  Object.entries(headers).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  return response;
}

/**
 * Predefined rate limit configurations
 */
export const RATE_LIMITS = {
  // Strict rate limit for auth endpoints (5 requests per 15 minutes)
  AUTH: {
    windowMs: 15 * 60 * 1000,
    maxRequests: 5,
    keyPrefix: 'ratelimit:auth',
  },
  // Standard rate limit for API endpoints (100 requests per 15 minutes)
  API: {
    windowMs: 15 * 60 * 1000,
    maxRequests: 100,
    keyPrefix: 'ratelimit:api',
  },
  // Relaxed rate limit for public endpoints (300 requests per 15 minutes)
  PUBLIC: {
    windowMs: 15 * 60 * 1000,
    maxRequests: 300,
    keyPrefix: 'ratelimit:public',
  },
  // Very strict for password reset (3 requests per hour)
  PASSWORD_RESET: {
    windowMs: 60 * 60 * 1000,
    maxRequests: 3,
    keyPrefix: 'ratelimit:password-reset',
  },
  // Moderate for search (50 requests per minute)
  SEARCH: {
    windowMs: 60 * 1000,
    maxRequests: 50,
    keyPrefix: 'ratelimit:search',
  },
};
