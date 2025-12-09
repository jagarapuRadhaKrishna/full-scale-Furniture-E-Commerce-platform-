import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/db/mongodb';
import { CART_COLLECTIONS, IWishlist, WISHLIST_INDEXES } from '@/models/Cart';
import { requireAuth } from '@/lib/middleware/auth';
import { asyncHandler, successResponse } from '@/lib/middleware/errorHandler';
import { ObjectId } from 'mongodb';

/**
 * GET /api/wishlist - Get user's wishlist
 */
async function getWishlistHandler(request: NextRequest, user: any): Promise<NextResponse> {
  const db = await getDatabase();
  const wishlistCollection = db.collection<IWishlist>(CART_COLLECTIONS.WISHLISTS);

  // Create indexes
  try {
    for (const index of WISHLIST_INDEXES) {
      await wishlistCollection.createIndex(index.key as any, {
        unique: index.unique,
      });
    }
  } catch (error) {
    console.error('Wishlist index creation error:', error);
  }

  let wishlist = await wishlistCollection.findOne({ userId: user._id });

  if (!wishlist) {
    wishlist = {
      userId: user._id,
      items: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await wishlistCollection.insertOne(wishlist);
  }

  return successResponse(wishlist, 'Wishlist retrieved successfully');
}

/**
 * POST /api/wishlist - Add item to wishlist
 */
async function addToWishlistHandler(request: NextRequest, user: any): Promise<NextResponse> {
  const body = await request.json();
  const { productId } = body;

  if (!productId) {
    return NextResponse.json({ success: false, error: 'Product ID required' }, { status: 400 });
  }

  const db = await getDatabase();
  const wishlistCollection = db.collection<IWishlist>(CART_COLLECTIONS.WISHLISTS);

  let wishlist = await wishlistCollection.findOne({ userId: user._id });

  if (!wishlist) {
    wishlist = {
      userId: user._id,
      items: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await wishlistCollection.insertOne(wishlist);
  }

  // Check if already in wishlist
  const exists = wishlist.items.some(
    (item) => item.productId.toString() === productId
  );

  if (exists) {
    return NextResponse.json(
      { success: false, error: 'Product already in wishlist' },
      { status: 400 }
    );
  }

  // Add to wishlist
  wishlist.items.push({
    productId: new ObjectId(productId),
    addedAt: new Date(),
  });
  wishlist.updatedAt = new Date();

  await wishlistCollection.updateOne(
    { userId: user._id },
    { $set: wishlist }
  );

  return successResponse(wishlist, 'Item added to wishlist');
}

/**
 * DELETE /api/wishlist - Remove item from wishlist
 */
async function removeFromWishlistHandler(request: NextRequest, user: any): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const productId = searchParams.get('productId');

  if (!productId) {
    return NextResponse.json({ success: false, error: 'Product ID required' }, { status: 400 });
  }

  const db = await getDatabase();
  const wishlistCollection = db.collection<IWishlist>(CART_COLLECTIONS.WISHLISTS);

  const wishlist = await wishlistCollection.findOne({ userId: user._id });

  if (!wishlist) {
    return NextResponse.json({ success: false, error: 'Wishlist not found' }, { status: 404 });
  }

  wishlist.items = wishlist.items.filter(
    (item) => item.productId.toString() !== productId
  );
  wishlist.updatedAt = new Date();

  await wishlistCollection.updateOne(
    { userId: user._id },
    { $set: wishlist }
  );

  return successResponse(wishlist, 'Item removed from wishlist');
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  return requireAuth(request, (req, user) => asyncHandler(getWishlistHandler)(req, user));
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  return requireAuth(request, (req, user) => asyncHandler(addToWishlistHandler)(req, user));
}

export async function DELETE(request: NextRequest): Promise<NextResponse> {
  return requireAuth(request, (req, user) => asyncHandler(removeFromWishlistHandler)(req, user));
}
