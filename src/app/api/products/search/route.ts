import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/db/mongodb';
import { PRODUCT_COLLECTIONS, IProduct } from '@/models/Product';
import { asyncHandler, successResponse } from '@/lib/middleware/errorHandler';

/**
 * GET /api/products/search - Advanced product search with autocomplete
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  return asyncHandler(async () => {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const limit = parseInt(searchParams.get('limit') || '10');

    if (!query || query.length < 2) {
      return successResponse([], 'Search query too short', 200);
    }

    const db = await getDatabase();
    const productsCollection = db.collection<IProduct>(PRODUCT_COLLECTIONS.PRODUCTS);

    // Search using text index and regex for partial matching
    const products = await productsCollection
      .find({
        status: 'active',
        $or: [
          { name: { $regex: query, $options: 'i' } },
          { description: { $regex: query, $options: 'i' } },
          { tags: { $regex: query, $options: 'i' } },
          { sku: { $regex: query, $options: 'i' } },
        ],
      })
      .project({
        _id: 1,
        name: 1,
        slug: 1,
        price: 1,
        images: { $slice: 1 },
        categoryId: 1,
        'rating.average': 1,
      })
      .limit(limit)
      .toArray();

    // Get unique suggestions from product names
    const suggestions = products.map((p) => p.name);

    return successResponse(
      {
        products,
        suggestions,
        total: products.length,
      },
      'Search results retrieved successfully'
    );
  })(request);
}
