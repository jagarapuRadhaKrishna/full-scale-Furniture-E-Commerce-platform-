import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/db/mongodb';
import { PRODUCT_COLLECTIONS, IProduct, ProductModel, PRODUCT_INDEXES } from '@/models/Product';
import { requireAdminOrVendor } from '@/lib/middleware/auth';
import { asyncHandler, successResponse, paginatedResponse } from '@/lib/middleware/errorHandler';
import { validatePagination } from '@/lib/middleware/validation';
import { ObjectId } from 'mongodb';

/**
 * GET /api/products - Get all products with filtering, sorting, and pagination
 */
async function getProductsHandler(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  
  // Pagination
  const { page, limit, errors } = validatePagination({
    page: searchParams.get('page') || '1',
    limit: searchParams.get('limit') || '20',
  });

  if (errors.length > 0) {
    return NextResponse.json({ success: false, errors }, { status: 400 });
  }

  // Build filter query
  const filter: any = { status: 'active' };

  // Category filter
  const categoryId = searchParams.get('category');
  if (categoryId && /^[0-9a-fA-F]{24}$/.test(categoryId)) {
    filter.categoryId = new ObjectId(categoryId);
  }

  // Brand filter
  const brandId = searchParams.get('brand');
  if (brandId && /^[0-9a-fA-F]{24}$/.test(brandId)) {
    filter.brandId = new ObjectId(brandId);
  }

  // Price range filter
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = parseFloat(minPrice);
    if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
  }

  // Color filter
  const color = searchParams.get('color');
  if (color) {
    filter['attributes.color'] = color;
  }

  // Material filter
  const material = searchParams.get('material');
  if (material) {
    filter['attributes.material'] = material;
  }

  // Rating filter
  const minRating = searchParams.get('minRating');
  if (minRating) {
    filter['rating.average'] = { $gte: parseFloat(minRating) };
  }

  // Featured/Trending filter
  if (searchParams.get('featured') === 'true') filter.featured = true;
  if (searchParams.get('trending') === 'true') filter.trending = true;

  // Sort
  const sortBy = searchParams.get('sortBy') || 'createdAt';
  const sortOrder = searchParams.get('sortOrder') === 'asc' ? 1 : -1;
  const sort: any = { [sortBy]: sortOrder };

  const db = await getDatabase();
  const productsCollection = db.collection<IProduct>(PRODUCT_COLLECTIONS.PRODUCTS);

  // Create indexes
  try {
    for (const index of PRODUCT_INDEXES) {
      await productsCollection.createIndex(index.key as any, {
        unique: index.unique,
      });
    }
  } catch (error) {
    console.error('Product index creation error:', error);
  }

  // Get total count
  const total = await productsCollection.countDocuments(filter);

  // Get products
  const products = await productsCollection
    .find(filter)
    .sort(sort)
    .skip((page - 1) * limit)
    .limit(limit)
    .toArray();

  const pages = Math.ceil(total / limit);

  return paginatedResponse(products, { page, limit, total, pages });
}

/**
 * POST /api/products - Create new product (Admin/Vendor only)
 */
async function createProductHandler(request: NextRequest, user: any): Promise<NextResponse> {
  const body = await request.json();

  if (user.role === 'Vendor') {
    body.vendorId = user._id;
  }

  const db = await getDatabase();
  const productsCollection = db.collection<IProduct>(PRODUCT_COLLECTIONS.PRODUCTS);

  if (body.slug) {
    const existing = await productsCollection.findOne({ slug: body.slug });
    if (existing) {
      return NextResponse.json(
        { success: false, error: 'Product with this slug already exists' },
        { status: 409 }
      );
    }
  }

  const newProduct = ProductModel.createProduct(body);
  const result = await productsCollection.insertOne(newProduct);
  const insertedProduct = await productsCollection.findOne({ _id: result.insertedId });

  return successResponse(insertedProduct, 'Product created successfully', 201);
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  return asyncHandler(getProductsHandler)(request);
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  return requireAdminOrVendor(request, (req, user) =>
    asyncHandler(createProductHandler)(req, user)
  );
}