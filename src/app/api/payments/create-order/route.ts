import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/middleware/auth';
import { asyncHandler, successResponse } from '@/lib/middleware/errorHandler';
import { createPaymentOrder } from '@/lib/payment/razorpay';
import { getDatabase } from '@/lib/db/mongodb';
import { CART_COLLECTIONS, ICart } from '@/models/Cart';

/**
 * POST /api/payments/create-order - Create Razorpay order
 */
async function createOrderHandler(request: NextRequest, user: any): Promise<NextResponse> {
  const body = await request.json();
  const { cartId, addressId } = body;

  if (!cartId || !addressId) {
    return NextResponse.json(
      { success: false, error: 'Cart ID and Address ID required' },
      { status: 400 }
    );
  }

  const db = await getDatabase();
  const cartsCollection = db.collection<ICart>(CART_COLLECTIONS.CARTS);

  // Get cart
  const cart = await cartsCollection.findOne({ _id: cartId, userId: user._id });

  if (!cart) {
    return NextResponse.json(
      { success: false, error: 'Cart not found' },
      { status: 404 }
    );
  }

  if (cart.items.length === 0) {
    return NextResponse.json(
      { success: false, error: 'Cart is empty' },
      { status: 400 }
    );
  }

  // Create Razorpay order
  const receiptId = `order_${Date.now()}_${user._id}`;
  const result = await createPaymentOrder({
    amount: cart.total,
    currency: 'INR',
    receipt: receiptId,
    notes: {
      userId: user._id.toString(),
      cartId: cart._id?.toString(),
      addressId,
    },
  });

  if (!result.success) {
    return NextResponse.json(
      { success: false, error: result.error },
      { status: 500 }
    );
  }

  return successResponse(
    {
      orderId: result.order.id,
      amount: result.order.amount,
      currency: result.order.currency,
      razorpayKeyId: process.env.RAZORPAY_KEY_ID,
    },
    'Payment order created successfully'
  );
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  return requireAuth(request, (req, user) => asyncHandler(createOrderHandler)(req, user));
}
