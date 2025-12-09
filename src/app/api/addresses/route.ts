import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/db/mongodb';
import { CART_COLLECTIONS, IAddress, ADDRESS_INDEXES } from '@/models/Cart';
import { requireAuth } from '@/lib/middleware/auth';
import { asyncHandler, successResponse } from '@/lib/middleware/errorHandler';
import { validateAddress, validationErrorResponse } from '@/lib/middleware/validation';
import { ObjectId } from 'mongodb';

/**
 * GET /api/addresses - Get user's addresses
 */
async function getAddressesHandler(request: NextRequest, user: any): Promise<NextResponse> {
  const db = await getDatabase();
  const addressesCollection = db.collection<IAddress>(CART_COLLECTIONS.ADDRESSES);

  // Create indexes
  try {
    for (const index of ADDRESS_INDEXES) {
      await addressesCollection.createIndex(index.key as any);
    }
  } catch (error) {
    console.error('Address index creation error:', error);
  }

  const addresses = await addressesCollection.find({ userId: user._id }).sort({ isDefault: -1 }).toArray();

  return successResponse(addresses, 'Addresses retrieved successfully');
}

/**
 * POST /api/addresses - Add new address
 */
async function createAddressHandler(request: NextRequest, user: any): Promise<NextResponse> {
  const body = await request.json();

  // Validate address
  const errors = validateAddress(body);
  if (errors.length > 0) {
    return validationErrorResponse(errors);
  }

  const db = await getDatabase();
  const addressesCollection = db.collection<IAddress>(CART_COLLECTIONS.ADDRESSES);

  // If this is default, remove default from other addresses
  if (body.isDefault) {
    await addressesCollection.updateMany(
      { userId: user._id, isDefault: true },
      { $set: { isDefault: false } }
    );
  }

  const newAddress: IAddress = {
    userId: user._id,
    type: body.type || 'Home',
    name: body.name,
    phone: body.phone,
    street: body.street,
    apartment: body.apartment,
    city: body.city,
    state: body.state,
    zipCode: body.zipCode,
    country: body.country || 'India',
    isDefault: body.isDefault || false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const result = await addressesCollection.insertOne(newAddress);
  const insertedAddress = await addressesCollection.findOne({ _id: result.insertedId });

  return successResponse(insertedAddress, 'Address added successfully', 201);
}

/**
 * PUT /api/addresses/[id] - Update address
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  return requireAuth(request, async (req, user) => {
    return asyncHandler(async () => {
      const { id } = params;
      const body = await req.json();

      const db = await getDatabase();
      const addressesCollection = db.collection<IAddress>(CART_COLLECTIONS.ADDRESSES);

      // If setting as default, remove default from others
      if (body.isDefault) {
        await addressesCollection.updateMany(
          { userId: user._id, isDefault: true },
          { $set: { isDefault: false } }
        );
      }

      const updateData = {
        ...body,
        updatedAt: new Date(),
      };

      await addressesCollection.updateOne(
        { _id: new ObjectId(id), userId: user._id },
        { $set: updateData }
      );

      const updatedAddress = await addressesCollection.findOne({ _id: new ObjectId(id) });

      return successResponse(updatedAddress, 'Address updated successfully');
    })();
  });
}

/**
 * DELETE /api/addresses/[id] - Delete address
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  return requireAuth(request, async (req, user) => {
    return asyncHandler(async () => {
      const { id } = params;

      const db = await getDatabase();
      const addressesCollection = db.collection<IAddress>(CART_COLLECTIONS.ADDRESSES);

      const result = await addressesCollection.deleteOne({
        _id: new ObjectId(id),
        userId: user._id,
      });

      if (result.deletedCount === 0) {
        return NextResponse.json(
          { success: false, error: 'Address not found' },
          { status: 404 }
        );
      }

      return successResponse(null, 'Address deleted successfully');
    })();
  });
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  return requireAuth(request, (req, user) => asyncHandler(getAddressesHandler)(req, user));
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  return requireAuth(request, (req, user) => asyncHandler(createAddressHandler)(req, user));
}
