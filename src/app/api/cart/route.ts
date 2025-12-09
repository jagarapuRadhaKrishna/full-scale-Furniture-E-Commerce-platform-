import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/db/mongodb';
import { CART_COLLECTIONS, ICart, CartModel, CART_INDEXES } from '@/models/Cart';
import { PRODUCT_COLLECTIONS, IProduct } from '@/models/Product';
import { optionalAuth } from '@/lib/middleware/auth';
import { asyncHandler, successResponse, NotFoundError } from '@/lib/middleware/errorHandler';
import { ObjectId } from 'mongodb';
import { v4 as uuidv4 } from 'uuid';

/**
 * GET /api/cart - Get user's cart
 */
async function getCartHandler(request: NextRequest): Promise<NextResponse> {
  const user = await optionalAuth(request);
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get('sessionId');

  const db = await getDatabase();
  const cartsCollection = db.collection<ICart>(CART_COLLECTIONS.CARTS);

  // Create indexes
  try {
    for (const index of CART_INDEXES) {
      const options: any = {};
      if (index.sparse) options.sparse = index.sparse;
      if (index.expireAfterSeconds !== undefined)
        options.expireAfterSeconds = index.expireAfterSeconds;
      await cartsCollection.createIndex(index.key as any, options);
    }
  } catch (error) {
    console.error('Cart index creation error:', error);
  }

  let cart: ICart | null = null;

  // Find cart by user ID or session ID
  if (user) {
    cart = await cartsCollection.findOne({ userId: user._id });
  } else if (sessionId) {
    cart = await cartsCollection.findOne({ sessionId });
  }

  // Create new cart if doesn't exist
  if (!cart) {
    cart = CartModel.createCart({
      userId: user?._id,
      sessionId: !user ? sessionId || uuidv4() : undefined,
    });
    await cartsCollection.insertOne(cart);
  }

  // Calculate totals
  const totals = CartModel.calculateTotals(cart.items);
  cart.subtotal = totals.subtotal;
  cart.tax = totals.tax;
  cart.shipping = totals.shipping;
  cart.total = totals.total;

  return successResponse(cart, 'Cart retrieved successfully');
}

/**
 * POST /api/cart - Add item to cart
 */
async function addToCartHandler(request: NextRequest): Promise<NextResponse> {
  const user = await optionalAuth(request);
  const body = await request.json();
  const { productId, quantity = 1, variant, sessionId } = body;

  if (!productId) {
    return NextResponse.json({ success: false, error: 'Product ID required' }, { status: 400 });
  }

  const db = await getDatabase();
  const cartsCollection = db.collection<ICart>(CART_COLLECTIONS.CARTS);
  const productsCollection = db.collection<IProduct>(PRODUCT_COLLECTIONS.PRODUCTS);

  // Get product details
  const product = await productsCollection.findOne({ _id: new ObjectId(productId) });
  if (!product) {
    throw new NotFoundError('Product not found');
  }

  // Check stock
  if (product.trackInventory && product.stock < quantity) {
    return NextResponse.json(
      { success: false, error: 'Insufficient stock' },
      { status: 400 }
    );
  }

  // Find or create cart
  let cart: ICart | null = null;
  if (user) {
    cart = await cartsCollection.findOne({ userId: user._id });
  } else if (sessionId) {
    cart = await cartsCollection.findOne({ sessionId });
  }

  if (!cart) {
    cart = CartModel.createCart({
      userId: user?._id,
      sessionId: !user ? sessionId || uuidv4() : undefined,
    });
    await cartsCollection.insertOne(cart);
  }

  // Add item to cart
  const cartItem = {
    productId: new ObjectId(productId),
    name: product.name,
    slug: product.slug,
    price: product.price,
    quantity,
    variant,
    image: product.images[0]?.url,
    maxQuantity: product.trackInventory ? product.stock : undefined,
  };

  cart = CartModel.addItem(cart, cartItem);

  // Calculate totals
  const totals = CartModel.calculateTotals(cart.items);
  cart.subtotal = totals.subtotal;
  cart.tax = totals.tax;
  cart.shipping = totals.shipping;
  cart.total = totals.total;

  // Update cart
  await cartsCollection.updateOne(
    { _id: cart._id },
    { $set: cart }
  );

  return successResponse(cart, 'Item added to cart successfully');
}

/**
 * PUT /api/cart - Update cart item quantity
 */
async function updateCartHandler(request: NextRequest): Promise<NextResponse> {
  const user = await optionalAuth(request);
  const body = await request.json();
  const { productId, quantity, variant, sessionId } = body;

  if (!productId || quantity === undefined) {
    return NextResponse.json(
      { success: false, error: 'Product ID and quantity required' },
      { status: 400 }
    );
  }

  const db = await getDatabase();
  const cartsCollection = db.collection<ICart>(CART_COLLECTIONS.CARTS);

  // Find cart
  let cart: ICart | null = null;
  if (user) {
    cart = await cartsCollection.findOne({ userId: user._id });
  } else if (sessionId) {
    cart = await cartsCollection.findOne({ sessionId });
  }

  if (!cart) {
    throw new NotFoundError('Cart not found');
  }

  // Update quantity
  if (quantity === 0) {
    cart = CartModel.removeItem(cart, new ObjectId(productId), variant);
  } else {
    cart = CartModel.updateQuantity(cart, new ObjectId(productId), quantity, variant);
  }

  // Calculate totals
  const totals = CartModel.calculateTotals(cart.items);
  cart.subtotal = totals.subtotal;
  cart.tax = totals.tax;
  cart.shipping = totals.shipping;
  cart.total = totals.total;

  // Update cart
  await cartsCollection.updateOne({ _id: cart._id }, { $set: cart });

  return successResponse(cart, 'Cart updated successfully');
}

/**
 * DELETE /api/cart - Clear cart
 */
async function clearCartHandler(request: NextRequest): Promise<NextResponse> {
  const user = await optionalAuth(request);
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get('sessionId');

  const db = await getDatabase();
  const cartsCollection = db.collection<ICart>(CART_COLLECTIONS.CARTS);

  // Find cart
  let cart: ICart | null = null;
  if (user) {
    cart = await cartsCollection.findOne({ userId: user._id });
  } else if (sessionId) {
    cart = await cartsCollection.findOne({ sessionId });
  }

  if (!cart) {
    throw new NotFoundError('Cart not found');
  }

  // Clear cart
  cart = CartModel.clearCart(cart);
  await cartsCollection.updateOne({ _id: cart._id }, { $set: cart });

  return successResponse(cart, 'Cart cleared successfully');
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  return asyncHandler(getCartHandler)(request);
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  return asyncHandler(addToCartHandler)(request);
}

export async function PUT(request: NextRequest): Promise<NextResponse> {
  return asyncHandler(updateCartHandler)(request);
}

export async function DELETE(request: NextRequest): Promise<NextResponse> {
  return asyncHandler(clearCartHandler)(request);
}
