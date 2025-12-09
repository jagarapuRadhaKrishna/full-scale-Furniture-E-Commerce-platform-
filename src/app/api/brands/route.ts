import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/db/mongodb';
import { PRODUCT_COLLECTIONS, IBrand, BrandModel, BRAND_INDEXES } from '@/models/Product';
import { requireAdmin } from '@/lib/middleware/auth';
import { asyncHandler, successResponse } from '@/lib/middleware/errorHandler';

/**
 * GET /api/brands - Get all brands
 */
async function getBrandsHandler(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const activeOnly = searchParams.get('activeOnly') === 'true';

  const db = await getDatabase();
  const brandsCollection = db.collection<IBrand>(PRODUCT_COLLECTIONS.BRANDS);

  // Create indexes
  try {
    for (const index of BRAND_INDEXES) {
      await brandsCollection.createIndex(index.key as any, {
        unique: index.unique,
      });
    }
  } catch (error) {
    console.error('Brand index creation error:', error);
  }

  const filter: any = {};
  if (activeOnly) {
    filter.isActive = true;
  }

  const brands = await brandsCollection.find(filter).sort({ order: 1 }).toArray();

  return successResponse(brands, 'Brands retrieved successfully');
}

/**
 * POST /api/brands - Create new brand (Admin only)
 */
async function createBrandHandler(request: NextRequest, user: any): Promise<NextResponse> {
  const body = await request.json();

  const db = await getDatabase();
  const brandsCollection = db.collection<IBrand>(PRODUCT_COLLECTIONS.BRANDS);

  // Check if slug already exists
  if (body.slug) {
    const existing = await brandsCollection.findOne({ slug: body.slug });
    if (existing) {
      return NextResponse.json(
        { success: false, error: 'Brand with this slug already exists' },
        { status: 409 }
      );
    }
  }

  const newBrand = BrandModel.createBrand(body);
  const result = await brandsCollection.insertOne(newBrand);
  const insertedBrand = await brandsCollection.findOne({ _id: result.insertedId });

  return successResponse(insertedBrand, 'Brand created successfully', 201);
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  return asyncHandler(getBrandsHandler)(request);
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  return requireAdmin(request, (req, user) =>
    asyncHandler(createBrandHandler)(req, user)
  );
}
