import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production-dfwfurniture2025';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key-dfwfurniture2025';
const JWT_EXPIRES_IN = '15m'; // Access token expires in 15 minutes
const JWT_REFRESH_EXPIRES_IN = '7d'; // Refresh token expires in 7 days

export interface JWTPayload {
  userId: string;
  email: string;
  role: string;
}

export function generateAccessToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function generateRefreshToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: JWT_REFRESH_EXPIRES_IN });
}

export function verifyAccessToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch (error) {
    return null;
  }
}

export function verifyRefreshToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_REFRESH_SECRET) as JWTPayload;
  } catch (error) {
    return null;
  }
}

export function generateEmailVerificationToken(email: string): string {
  return jwt.sign({ email, purpose: 'email-verification' }, JWT_SECRET, { expiresIn: '24h' });
}

export function generatePasswordResetToken(email: string): string {
  return jwt.sign({ email, purpose: 'password-reset' }, JWT_SECRET, { expiresIn: '1h' });
}

export function verifyEmailVerificationToken(token: string): { email: string } | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    if (decoded.purpose === 'email-verification') {
      return { email: decoded.email };
    }
    return null;
  } catch (error) {
    return null;
  }
}

export function verifyPasswordResetToken(token: string): { email: string } | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    if (decoded.purpose === 'password-reset') {
      return { email: decoded.email };
    }
    return null;
  } catch (error) {
    return null;
  }
}
