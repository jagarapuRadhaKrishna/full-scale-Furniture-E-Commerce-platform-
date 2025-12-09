import { ObjectId } from 'mongodb';

export interface ICartItem {
  productId: ObjectId;
  name: string;
  slug: string;
  price: number;
  quantity: number;
  variant?: {
    color?: string;
    size?: string;
    material?: string;
  };
  image?: string;
  maxQuantity?: number; // Stock limit
}

export interface ICart {
  _id?: ObjectId;
  userId?: ObjectId; // Optional for guest carts
  sessionId?: string; // For guest users
  items: ICartItem[];
  subtotal: number;
  discount: number;
  tax: number;
  shipping: number;
  total: number;
  couponCode?: string;
  createdAt: Date;
  updatedAt: Date;
  expiresAt?: Date; // For guest carts
}

export interface IWishlist {
  _id?: ObjectId;
  userId: ObjectId;
  items: Array<{
    productId: ObjectId;
    addedAt: Date;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICoupon {
  _id?: ObjectId;
  code: string;
  description: string;
  type: 'percentage' | 'fixed';
  value: number;
  minPurchase?: number;
  maxDiscount?: number;
  usageLimit?: number;
  usageCount: number;
  userLimit?: number; // Per user limit
  userUsage?: Map<string, number>; // userId -> count
  applicableCategories?: ObjectId[];
  applicableProducts?: ObjectId[];
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAddress {
  _id?: ObjectId;
  userId: ObjectId;
  type: 'Home' | 'Work' | 'Other';
  name: string;
  phone: string;
  street: string;
  apartment?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// MongoDB Collection Names
export const CART_COLLECTIONS = {
  CARTS: 'carts',
  WISHLISTS: 'wishlists',
  COUPONS: 'coupons',
  ADDRESSES: 'addresses',
};

// MongoDB Indexes
export const CART_INDEXES = [
  { key: { userId: 1 }, sparse: true },
  { key: { sessionId: 1 }, sparse: true },
  { key: { expiresAt: 1 }, expireAfterSeconds: 0 }, // TTL for guest carts
  { key: { updatedAt: -1 } },
];

export const WISHLIST_INDEXES = [
  { key: { userId: 1 }, unique: true },
  { key: { 'items.productId': 1 } },
];

export const COUPON_INDEXES = [
  { key: { code: 1 }, unique: true },
  { key: { isActive: 1 } },
  { key: { startDate: 1, endDate: 1 } },
];

export const ADDRESS_INDEXES = [
  { key: { userId: 1 } },
  { key: { isDefault: 1 } },
];

// Helper functions for Cart operations
export class CartModel {
  /**
   * Create a new cart document
   */
  static createCart(cartData: Partial<ICart>): ICart {
    const now = new Date();
    return {
      userId: cartData.userId,
      sessionId: cartData.sessionId,
      items: cartData.items || [],
      subtotal: 0,
      discount: 0,
      tax: 0,
      shipping: 0,
      total: 0,
      createdAt: now,
      updatedAt: now,
      expiresAt: cartData.sessionId ? new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000) : undefined, // 7 days for guests
    };
  }

  /**
   * Calculate cart totals
   */
  static calculateTotals(
    items: ICartItem[],
    coupon?: ICoupon,
    taxRate: number = 0.18 // 18% GST
  ): {
    subtotal: number;
    discount: number;
    tax: number;
    shipping: number;
    total: number;
  } {
    // Calculate subtotal
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Calculate discount
    let discount = 0;
    if (coupon) {
      if (coupon.type === 'percentage') {
        discount = (subtotal * coupon.value) / 100;
        if (coupon.maxDiscount) {
          discount = Math.min(discount, coupon.maxDiscount);
        }
      } else {
        discount = coupon.value;
      }
    }

    // Calculate shipping (free above 50000)
    const shipping = subtotal >= 50000 ? 0 : 500;

    // Calculate tax on (subtotal - discount)
    const taxableAmount = subtotal - discount;
    const tax = taxableAmount * taxRate;

    // Calculate total
    const total = subtotal - discount + tax + shipping;

    return {
      subtotal: Math.round(subtotal * 100) / 100,
      discount: Math.round(discount * 100) / 100,
      tax: Math.round(tax * 100) / 100,
      shipping,
      total: Math.round(total * 100) / 100,
    };
  }

  /**
   * Add item to cart
   */
  static addItem(cart: ICart, newItem: ICartItem): ICart {
    const existingIndex = cart.items.findIndex(
      (item) =>
        item.productId.toString() === newItem.productId.toString() &&
        JSON.stringify(item.variant) === JSON.stringify(newItem.variant)
    );

    if (existingIndex >= 0) {
      // Update quantity
      cart.items[existingIndex].quantity += newItem.quantity;
      if (newItem.maxQuantity) {
        cart.items[existingIndex].quantity = Math.min(
          cart.items[existingIndex].quantity,
          newItem.maxQuantity
        );
      }
    } else {
      // Add new item
      cart.items.push(newItem);
    }

    cart.updatedAt = new Date();
    return cart;
  }

  /**
   * Remove item from cart
   */
  static removeItem(cart: ICart, productId: ObjectId, variant?: any): ICart {
    cart.items = cart.items.filter(
      (item) =>
        !(
          item.productId.toString() === productId.toString() &&
          JSON.stringify(item.variant) === JSON.stringify(variant)
        )
    );
    cart.updatedAt = new Date();
    return cart;
  }

  /**
   * Update item quantity
   */
  static updateQuantity(cart: ICart, productId: ObjectId, quantity: number, variant?: any): ICart {
    const item = cart.items.find(
      (item) =>
        item.productId.toString() === productId.toString() &&
        JSON.stringify(item.variant) === JSON.stringify(variant)
    );

    if (item) {
      item.quantity = quantity;
      if (item.maxQuantity) {
        item.quantity = Math.min(item.quantity, item.maxQuantity);
      }
      cart.updatedAt = new Date();
    }

    return cart;
  }

  /**
   * Clear cart
   */
  static clearCart(cart: ICart): ICart {
    cart.items = [];
    cart.subtotal = 0;
    cart.discount = 0;
    cart.tax = 0;
    cart.shipping = 0;
    cart.total = 0;
    cart.couponCode = undefined;
    cart.updatedAt = new Date();
    return cart;
  }
}

// Helper functions for Coupon operations
export class CouponModel {
  /**
   * Create a new coupon document
   */
  static createCoupon(couponData: Partial<ICoupon>): ICoupon {
    return {
      code: couponData.code?.toUpperCase() || '',
      description: couponData.description || '',
      type: couponData.type || 'fixed',
      value: couponData.value || 0,
      minPurchase: couponData.minPurchase,
      maxDiscount: couponData.maxDiscount,
      usageLimit: couponData.usageLimit,
      usageCount: 0,
      userLimit: couponData.userLimit,
      userUsage: new Map(),
      applicableCategories: couponData.applicableCategories,
      applicableProducts: couponData.applicableProducts,
      startDate: couponData.startDate || new Date(),
      endDate: couponData.endDate!,
      isActive: couponData.isActive !== false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  /**
   * Validate coupon
   */
  static validateCoupon(
    coupon: ICoupon,
    userId?: string,
    cartTotal?: number,
    categoryIds?: ObjectId[],
    productIds?: ObjectId[]
  ): { valid: boolean; error?: string } {
    // Check if active
    if (!coupon.isActive) {
      return { valid: false, error: 'Coupon is inactive' };
    }

    // Check dates
    const now = new Date();
    if (now < coupon.startDate) {
      return { valid: false, error: 'Coupon is not yet active' };
    }
    if (now > coupon.endDate) {
      return { valid: false, error: 'Coupon has expired' };
    }

    // Check usage limit
    if (coupon.usageLimit && coupon.usageCount >= coupon.usageLimit) {
      return { valid: false, error: 'Coupon usage limit reached' };
    }

    // Check per-user limit
    if (userId && coupon.userLimit) {
      const userCount = coupon.userUsage?.get(userId) || 0;
      if (userCount >= coupon.userLimit) {
        return { valid: false, error: 'You have already used this coupon maximum times' };
      }
    }

    // Check minimum purchase
    if (coupon.minPurchase && cartTotal && cartTotal < coupon.minPurchase) {
      return {
        valid: false,
        error: `Minimum purchase of ₹${coupon.minPurchase} required`,
      };
    }

    // Check applicable categories/products
    if (coupon.applicableCategories && categoryIds) {
      const hasValidCategory = categoryIds.some((catId) =>
        coupon.applicableCategories!.some((applId) => applId.toString() === catId.toString())
      );
      if (!hasValidCategory) {
        return { valid: false, error: 'Coupon not applicable to items in cart' };
      }
    }

    if (coupon.applicableProducts && productIds) {
      const hasValidProduct = productIds.some((prodId) =>
        coupon.applicableProducts!.some((applId) => applId.toString() === prodId.toString())
      );
      if (!hasValidProduct) {
        return { valid: false, error: 'Coupon not applicable to items in cart' };
      }
    }

    return { valid: true };
  }
}
