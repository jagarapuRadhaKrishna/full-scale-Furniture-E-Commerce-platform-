import { NextResponse } from 'next/server';

// Validation error interface
export interface ValidationError {
  field: string;
  message: string;
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate phone number (Indian format)
 */
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(phone);
}

/**
 * Validate password strength
 */
export function isValidPassword(password: string): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  if (!/[@$!%*?&#]/.test(password)) {
    errors.push('Password must contain at least one special character (@$!%*?&#)');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Validate required fields
 */
export function validateRequired(
  data: Record<string, any>,
  requiredFields: string[]
): ValidationError[] {
  const errors: ValidationError[] = [];

  for (const field of requiredFields) {
    if (!data[field] || (typeof data[field] === 'string' && data[field].trim() === '')) {
      errors.push({
        field,
        message: `${field} is required`,
      });
    }
  }

  return errors;
}

/**
 * Validate user registration data
 */
export function validateRegistration(data: {
  name?: string;
  email?: string;
  password?: string;
  phone?: string;
  role?: string;
}): ValidationError[] {
  const errors: ValidationError[] = [];

  // Required fields
  const requiredErrors = validateRequired(data, ['name', 'email', 'password']);
  errors.push(...requiredErrors);

  // Email validation
  if (data.email && !isValidEmail(data.email)) {
    errors.push({
      field: 'email',
      message: 'Invalid email format',
    });
  }

  // Password validation
  if (data.password) {
    const passwordValidation = isValidPassword(data.password);
    if (!passwordValidation.valid) {
      errors.push({
        field: 'password',
        message: passwordValidation.errors.join(', '),
      });
    }
  }

  // Phone validation (if provided)
  if (data.phone && !isValidPhone(data.phone)) {
    errors.push({
      field: 'phone',
      message: 'Invalid phone number format (10 digits starting with 6-9)',
    });
  }

  // Role validation
  const validRoles = ['Customer', 'Admin', 'Vendor', 'Delivery'];
  if (data.role && !validRoles.includes(data.role)) {
    errors.push({
      field: 'role',
      message: `Invalid role. Must be one of: ${validRoles.join(', ')}`,
    });
  }

  return errors;
}

/**
 * Validate login data
 */
export function validateLogin(data: { email?: string; password?: string }): ValidationError[] {
  const errors: ValidationError[] = [];

  // Required fields
  const requiredErrors = validateRequired(data, ['email', 'password']);
  errors.push(...requiredErrors);

  // Email validation
  if (data.email && !isValidEmail(data.email)) {
    errors.push({
      field: 'email',
      message: 'Invalid email format',
    });
  }

  return errors;
}

/**
 * Validate address data for cart/checkout
 */
export function validateAddressData(data: {
  street?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
}): ValidationError[] {
  const errors: ValidationError[] = [];

  // Required fields
  const requiredErrors = validateRequired(data, ['street', 'city', 'state', 'zipCode', 'country']);
  errors.push(...requiredErrors);

  // Zip code format (Indian PIN code)
  if (data.zipCode && !/^\d{6}$/.test(data.zipCode)) {
    errors.push({
      field: 'zipCode',
      message: 'Invalid ZIP code format (6 digits)',
    });
  }

  return errors;
}

/**
 * Validate ObjectId format
 */
export function isValidObjectId(id: string): boolean {
  return /^[0-9a-fA-F]{24}$/.test(id);
}

/**
 * Validate pagination parameters
 */
export function validatePagination(params: {
  page?: string | number;
  limit?: string | number;
}): {
  page: number;
  limit: number;
  errors: ValidationError[];
} {
  const errors: ValidationError[] = [];
  let page = 1;
  let limit = 10;

  if (params.page) {
    const parsedPage = typeof params.page === 'string' ? parseInt(params.page, 10) : params.page;
    if (isNaN(parsedPage) || parsedPage < 1) {
      errors.push({
        field: 'page',
        message: 'Page must be a positive number',
      });
    } else {
      page = parsedPage;
    }
  }

  if (params.limit) {
    const parsedLimit = typeof params.limit === 'string' ? parseInt(params.limit, 10) : params.limit;
    if (isNaN(parsedLimit) || parsedLimit < 1 || parsedLimit > 100) {
      errors.push({
        field: 'limit',
        message: 'Limit must be between 1 and 100',
      });
    } else {
      limit = parsedLimit;
    }
  }

  return { page, limit, errors };
}

/**
 * Create validation error response
 */
export function validationErrorResponse(errors: string[]): NextResponse {
  return NextResponse.json(
    {
      success: false,
      error: 'Validation failed',
      errors,
    },
    { status: 400 }
  );
}

/**
 * Validate address
 */
export function validateAddress(address: any): string[] {
  const errors: string[] = [];

  if (!address.name || address.name.trim().length < 2) {
    errors.push('Name must be at least 2 characters');
  }

  if (!address.phone || !/^[6-9]\d{9}$/.test(address.phone)) {
    errors.push('Invalid phone number. Must be a 10-digit Indian mobile number');
  }

  if (!address.street || address.street.trim().length < 5) {
    errors.push('Street address must be at least 5 characters');
  }

  if (!address.city || address.city.trim().length < 2) {
    errors.push('City must be at least 2 characters');
  }

  if (!address.state || address.state.trim().length < 2) {
    errors.push('State must be at least 2 characters');
  }

  if (!address.zipCode || !/^\d{6}$/.test(address.zipCode)) {
    errors.push('Invalid ZIP code. Must be a 6-digit number');
  }

  return errors;
}

/**
 * Sanitize user input (prevent XSS)
 */
export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove < and >
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, ''); // Remove event handlers
}

/**
 * Validate and sanitize object
 */
export function sanitizeObject<T extends Record<string, any>>(obj: T): T {
  const sanitized = { ...obj };
  for (const key in sanitized) {
    if (typeof sanitized[key] === 'string') {
      sanitized[key] = sanitizeInput(sanitized[key]) as any;
    }
  }
  return sanitized;
}
