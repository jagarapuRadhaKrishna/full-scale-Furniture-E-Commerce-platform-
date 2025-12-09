import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/db/mongodb';
import { PRODUCT_COLLECTIONS, IProduct } from '@/models/Product';
import { ORDER_COLLECTIONS } from '@/models/Order';
import { requireVendor } from '@/lib/middleware/auth';
import { asyncHandler, successResponse } from '@/lib/middleware/errorHandler';

/**
 * GET /api/vendor/dashboard - Get vendor dashboard statistics
 */
async function getVendorDashboardHandler(request: NextRequest, user: any): Promise<NextResponse> {
  const db = await getDatabase();
  const productsCollection = db.collection<IProduct>(PRODUCT_COLLECTIONS.PRODUCTS);
  const ordersCollection = db.collection(ORDER_COLLECTIONS.ORDERS);

  // Date ranges
  const today = new Date();
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  // Fetch vendor-specific data
  const [
    totalProducts,
    activeProducts,
    totalOrders,
    monthlyOrders,
    totalRevenue,
    monthlyRevenue,
    recentOrders,
    topSellingProducts,
    lowStockProducts,
  ] = await Promise.all([
    // Total products
    productsCollection.countDocuments({ vendorId: user._id }),
    
    // Active products
    productsCollection.countDocuments({ vendorId: user._id, isActive: true }),
    
    // Total orders containing vendor's products
    ordersCollection
      .aggregate([
        { $unwind: '$items' },
        {
          $lookup: {
            from: PRODUCT_COLLECTIONS.PRODUCTS,
            localField: 'items.productId',
            foreignField: '_id',
            as: 'product',
          },
        },
        { $unwind: '$product' },
        { $match: { 'product.vendorId': user._id } },
        { $group: { _id: '$_id' } },
        { $count: 'total' },
      ])
      .toArray()
      .then((res) => res[0]?.total || 0),
    
    // Monthly orders
    ordersCollection
      .aggregate([
        { $unwind: '$items' },
        {
          $lookup: {
            from: PRODUCT_COLLECTIONS.PRODUCTS,
            localField: 'items.productId',
            foreignField: '_id',
            as: 'product',
          },
        },
        { $unwind: '$product' },
        { $match: { 'product.vendorId': user._id, createdAt: { $gte: startOfMonth } } },
        { $group: { _id: '$_id' } },
        { $count: 'total' },
      ])
      .toArray()
      .then((res) => res[0]?.total || 0),
    
    // Total revenue
    ordersCollection
      .aggregate([
        { $unwind: '$items' },
        {
          $lookup: {
            from: PRODUCT_COLLECTIONS.PRODUCTS,
            localField: 'items.productId',
            foreignField: '_id',
            as: 'product',
          },
        },
        { $unwind: '$product' },
        { $match: { 'product.vendorId': user._id } },
        { $group: { _id: null, total: { $sum: '$items.total' } } },
      ])
      .toArray()
      .then((res) => res[0]?.total || 0),
    
    // Monthly revenue
    ordersCollection
      .aggregate([
        { $unwind: '$items' },
        {
          $lookup: {
            from: PRODUCT_COLLECTIONS.PRODUCTS,
            localField: 'items.productId',
            foreignField: '_id',
            as: 'product',
          },
        },
        { $unwind: '$product' },
        { $match: { 'product.vendorId': user._id, createdAt: { $gte: startOfMonth } } },
        { $group: { _id: null, total: { $sum: '$items.total' } } },
      ])
      .toArray()
      .then((res) => res[0]?.total || 0),
    
    // Recent orders
    ordersCollection
      .aggregate([
        { $unwind: '$items' },
        {
          $lookup: {
            from: PRODUCT_COLLECTIONS.PRODUCTS,
            localField: 'items.productId',
            foreignField: '_id',
            as: 'product',
          },
        },
        { $unwind: '$product' },
        { $match: { 'product.vendorId': user._id } },
        { $sort: { createdAt: -1 } },
        { $limit: 10 },
      ])
      .toArray(),
    
    // Top selling products
    ordersCollection
      .aggregate([
        { $unwind: '$items' },
        {
          $lookup: {
            from: PRODUCT_COLLECTIONS.PRODUCTS,
            localField: 'items.productId',
            foreignField: '_id',
            as: 'product',
          },
        },
        { $unwind: '$product' },
        { $match: { 'product.vendorId': user._id } },
        {
          $group: {
            _id: '$items.productId',
            productName: { $first: '$items.productName' },
            totalSold: { $sum: '$items.quantity' },
            totalRevenue: { $sum: '$items.total' },
          },
        },
        { $sort: { totalSold: -1 } },
        { $limit: 10 },
      ])
      .toArray(),
    
    // Low stock products
    productsCollection
      .find({
        vendorId: user._id,
        trackInventory: true,
        stock: { $lte: 10 },
        isActive: true,
      })
      .limit(10)
      .toArray(),
  ]);

  const dashboard = {
    kpis: {
      totalProducts: { value: totalProducts },
      activeProducts: { value: activeProducts },
      totalOrders: { value: totalOrders },
      monthlyOrders: { value: monthlyOrders },
      totalRevenue: { value: totalRevenue },
      monthlyRevenue: { value: monthlyRevenue },
    },
    recentOrders,
    topSellingProducts,
    lowStockProducts,
  };

  return successResponse(dashboard, 'Vendor dashboard data retrieved successfully');
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  return requireVendor(request, (req, user) => asyncHandler(getVendorDashboardHandler)(req, user));
}
