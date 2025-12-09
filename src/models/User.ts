import { ObjectId } from 'mongodb';

export interface IUser {
  _id?: ObjectId;
  name: string;
  email: string;
  password: string;
  phone?: string;
  role: 'Customer' | 'Admin' | 'Vendor' | 'Delivery';
  isVerified: boolean;
  isActive: boolean;
  emailVerificationToken?: string;
  emailVerificationExpiry?: Date;
  passwordResetToken?: string;
  passwordResetExpiry?: Date;
  refreshToken?: string;
  profile?: {
    avatar?: string;
    dateOfBirth?: Date;
    gender?: 'Male' | 'Female' | 'Other';
    preferences?: string[];
  };
  addresses?: Array<{
    _id?: ObjectId;
    type: 'Home' | 'Work' | 'Other';
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    isDefault: boolean;
  }>;
  vendorDetails?: {
    businessName?: string;
    gstNumber?: string;
    commissionRate?: number;
    bankDetails?: {
      accountNumber?: string;
      ifscCode?: string;
      accountHolderName?: string;
    };
  };
  deliveryAgentDetails?: {
    vehicleType?: string;
    licenseNumber?: string;
    availabilityStatus?: 'Available' | 'Busy' | 'Offline';
  };
  createdAt: Date;
  updatedAt: Date;
  lastLogin?: Date;
}

export interface ISession {
  _id?: ObjectId;
  userId: ObjectId;
  refreshToken: string;
  deviceInfo?: {
    userAgent?: string;
    ip?: string;
    device?: string;
  };
  expiresAt: Date;
  createdAt: Date;
}

// MongoDB Collection Names
export const COLLECTIONS = {
  USERS: 'users',
  SESSIONS: 'sessions',
};

// MongoDB Indexes for Users Collection
export const USER_INDEXES = [
  { key: { email: 1 }, unique: true },
  { key: { phone: 1 }, sparse: true },
  { key: { role: 1 } },
  { key: { isVerified: 1 } },
  { key: { emailVerificationToken: 1 }, sparse: true },
  { key: { passwordResetToken: 1 }, sparse: true },
  { key: { createdAt: -1 } },
];

// MongoDB Indexes for Sessions Collection
export const SESSION_INDEXES = [
  { key: { userId: 1 } },
  { key: { refreshToken: 1 }, unique: true },
  { key: { expiresAt: 1 }, expireAfterSeconds: 0 }, // TTL index
  { key: { createdAt: -1 } },
];

// Helper functions for User operations
export class UserModel {
  /**
   * Create a new user document
   */
  static createUser(userData: Partial<IUser>): IUser {
    return {
      name: userData.name || '',
      email: userData.email || '',
      password: userData.password || '',
      phone: userData.phone,
      role: userData.role || 'Customer',
      isVerified: false,
      isActive: true,
      profile: userData.profile || {},
      addresses: userData.addresses || [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  /**
   * Sanitize user data (remove sensitive fields)
   */
  static sanitizeUser(user: IUser): Partial<IUser> {
    const sanitized: any = { ...user };
    delete sanitized.password;
    delete sanitized.emailVerificationToken;
    delete sanitized.emailVerificationExpiry;
    delete sanitized.passwordResetToken;
    delete sanitized.passwordResetExpiry;
    delete sanitized.refreshToken;
    return sanitized;
  }

  /**
   * Check if user has specific role
   */
  static hasRole(user: IUser, role: IUser['role']): boolean {
    return user.role === role;
  }

  /**
   * Check if user can access admin panel
   */
  static isAdmin(user: IUser): boolean {
    return user.role === 'Admin';
  }

  /**
   * Check if user is a vendor
   */
  static isVendor(user: IUser): boolean {
    return user.role === 'Vendor';
  }

  /**
   * Check if user is a delivery agent
   */
  static isDeliveryAgent(user: IUser): boolean {
    return user.role === 'Delivery';
  }
}

// Helper functions for Session operations
export class SessionModel {
  /**
   * Create a new session document
   */
  static createSession(sessionData: {
    userId: ObjectId;
    refreshToken: string;
    deviceInfo?: ISession['deviceInfo'];
    expiresAt: Date;
  }): ISession {
    return {
      userId: sessionData.userId,
      refreshToken: sessionData.refreshToken,
      deviceInfo: sessionData.deviceInfo,
      expiresAt: sessionData.expiresAt,
      createdAt: new Date(),
    };
  }

  /**
   * Check if session is expired
   */
  static isExpired(session: ISession): boolean {
    return new Date() > session.expiresAt;
  }
}
