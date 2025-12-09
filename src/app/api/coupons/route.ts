import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/db/mongodb';
import { CART_COLLECTIONS, ICoupon, CouponModel, COUPON_INDEXES } from '@/models/Cart';
import { requireAdmin, optionalAuth } from '@/lib/middleware/auth';
import { asyncHandler, successResponse } from '@/lib/middleware/errorHandler';
import { ObjectId } from 'mongodb';

/**
 * GET /api/coupons - Get all active coupons (public) or all coupons (admin)
 */
async function getCouponsHandler(request: NextRequest): Promise<NextResponse> {
  const user = await optionalAuth(request);
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  const db = await getDatabase();
  const couponsCollection = db.collection<ICoupon>(CART_COLLECTIONS.COUPONS);

  // Create indexes
  try {
    for (const index of COUPON_INDEXES) {
      await couponsCollection.createIndex(index.key as any, {
        unique: index.unique,
      });
    }
  } catch (error) {
    console.error('Coupon index creation error:', error);
  }

  // If code provided, get specific coupon
  if (code) {
    const coupon = await couponsCollection.findOne({ code: code.toUpperCase() });
    if (!coupon) {
      return NextResponse.json({ success: false, error: 'Coupon not found' }, { status: 404 });
    }
    return successResponse(coupon, 'Coupon retrieved successfully');
  }

  // If admin, get all coupons, otherwise only active ones
  const filter: any = user?.role === 'Admin' ? {} : { isActive: true };
  const coupons = await couponsCollection.find(filter).toArray();

  return successResponse(coupons, 'Coupons retrieved successfully');
}

/**
 * POST /api/coupons - Create new coupon (Admin only)
 */
async function createCouponHandler(request: NextRequest, user: any): Promise<NextResponse> {
  const body = await request.json();

  const db = await getDatabase();
  const couponsCollection = db.collection<ICoupon>(CART_COLLECTIONS.COUPONS);

  // Check if code already exists
  if (body.code) {
    const existing = await couponsCollection.findOne({ code: body.code.toUpperCase() });
    if (existing) {
      return NextResponse.json(
        { success: false, error: 'Coupon code already exists' },
        { status: 409 }
      );
    }
  }

  const newCoupon = CouponModel.createCoupon(body);
  const result = await couponsCollection.insertOne(newCoupon);
  const insertedCoupon = await couponsCollection.findOne({ _id: result.insertedId });

  return successResponse(insertedCoupon, 'Coupon created successfully', 201);
}

/**
 * POST /api/coupons/validate - Validate coupon
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action');

  if (action === 'validate') {
    return asyncHandler(async (req: NextRequest) => {
      const user = await optionalAuth(req);
      const body = await req.json();
      const { code, cartTotal, categoryIds, productIds } = body;

      const db = await getDatabase();
      const couponsCollection = db.collection<ICoupon>(CART_COLLECTIONS.COUPONS);

      const coupon = await couponsCollection.findOne({ code: code.toUpperCase() });

      if (!coupon) {
        return NextResponse.json(
          { success: false, error: 'Invalid coupon code' },
          { status: 404 }
        );
      }

      const validation = CouponModel.validateCoupon(
        coupon,
        user?._id?.toString(),
        cartTotal,
        categoryIds?.map((id: string) => new ObjectId(id)),
        productIds?.map((id: string) => new ObjectId(id))
      );

      if (!validation.valid) {
        return NextResponse.json(
          { success: false, error: validation.error },
          { status: 400 }
        );
      }

      return successResponse(
        {
          coupon,
          discount: coupon.type === 'percentage'
            ? (cartTotal * coupon.value) / 100
            : coupon.value,
        },
        'Coupon is valid'
      );
    })(request);
  }

  // Default: Create coupon (Admin only)
  return requireAdmin(request, (req, user) => asyncHandler(createCouponHandler)(req, user));
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  return asyncHandler(getCouponsHandler)(request);
}
