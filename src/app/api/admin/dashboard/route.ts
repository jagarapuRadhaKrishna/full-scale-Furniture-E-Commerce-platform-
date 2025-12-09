import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/db/mongodb';
import { ORDER_COLLECTIONS, IOrder } from '@/models/Order';
import { PRODUCT_COLLECTIONS } from '@/models/Product';
import { USER_COLLECTIONS } from '@/models/User';
import { requireAdmin } from '@/lib/middleware/auth';
import { asyncHandler, successResponse } from '@/lib/middleware/errorHandler';

/**
 * GET /api/admin/dashboard - Get admin dashboard statistics
 */
async function getAdminDashboardHandler(request: NextRequest, user: any): Promise<NextResponse> {
  const db = await getDatabase();
  const ordersCollection = db.collection<IOrder>(ORDER_COLLECTIONS.ORDERS);
  const productsCollection = db.collection(PRODUCT_COLLECTIONS.PRODUCTS);
  const usersCollection = db.collection(USER_COLLECTIONS.USERS);

  // Date ranges
  const today = new Date();
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const startOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  const endOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);

  // Fetch all data in parallel
  const [
    totalOrders,
    totalRevenue,
    totalProducts,
    totalUsers,
    monthlyOrders,
    monthlyRevenue,
    lastMonthOrders,
    lastMonthRevenue,
    recentOrders,
    topSellingProducts,
    ordersByStatus,
    revenueByMonth,
  ] = await Promise.all([
    // Total orders
    ordersCollection.countDocuments({}),
    
    // Total revenue
    ordersCollection
      .aggregate([
        { $match: { status: { $ne: 'Cancelled' } } },
        { $group: { _id: null, total: { $sum: '$total' } } },
      ])
      .toArray()
      .then((res) => res[0]?.total || 0),
    
    // Total products
    productsCollection.countDocuments({ isActive: true }),
    
    // Total users
    usersCollection.countDocuments({ role: 'Customer' }),
    
    // Monthly orders
    ordersCollection.countDocuments({ createdAt: { $gte: startOfMonth } }),
    
    // Monthly revenue
    ordersCollection
      .aggregate([
        { $match: { createdAt: { $gte: startOfMonth }, status: { $ne: 'Cancelled' } } },
        { $group: { _id: null, total: { $sum: '$total' } } },
      ])
      .toArray()
      .then((res) => res[0]?.total || 0),
    
    // Last month orders
    ordersCollection.countDocuments({
      createdAt: { $gte: startOfLastMonth, $lte: endOfLastMonth },
    }),
    
    // Last month revenue
    ordersCollection
      .aggregate([
        {
          $match: {
            createdAt: { $gte: startOfLastMonth, $lte: endOfLastMonth },
            status: { $ne: 'Cancelled' },
          },
        },
        { $group: { _id: null, total: { $sum: '$total' } } },
      ])
      .toArray()
      .then((res) => res[0]?.total || 0),
    
    // Recent orders
    ordersCollection
      .find({})
      .sort({ createdAt: -1 })
      .limit(10)
      .toArray(),
    
    // Top selling products
    ordersCollection
      .aggregate([
        { $unwind: '$items' },
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
    
    // Orders by status
    ordersCollection
      .aggregate([
        { $group: { _id: '$status', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ])
      .toArray(),
    
    // Revenue by month (last 12 months)
    ordersCollection
      .aggregate([
        {
          $match: {
            createdAt: {
              $gte: new Date(new Date().setMonth(new Date().getMonth() - 11)),
            },
            status: { $ne: 'Cancelled' },
          },
        },
        {
          $group: {
            _id: {
              year: { $year: '$createdAt' },
              month: { $month: '$createdAt' },
            },
            revenue: { $sum: '$total' },
            orders: { $sum: 1 },
          },
        },
        { $sort: { '_id.year': 1, '_id.month': 1 } },
      ])
      .toArray(),
  ]);

  // Calculate growth percentages
  const ordersGrowth = lastMonthOrders > 0
    ? ((monthlyOrders - lastMonthOrders) / lastMonthOrders) * 100
    : 100;

  const revenueGrowth = lastMonthRevenue > 0
    ? ((monthlyRevenue - lastMonthRevenue) / lastMonthRevenue) * 100
    : 100;

  const dashboard = {
    kpis: {
      totalOrders: {
        value: totalOrders,
        change: ordersGrowth.toFixed(1),
        trend: ordersGrowth >= 0 ? 'up' : 'down',
      },
      totalRevenue: {
        value: totalRevenue,
        change: revenueGrowth.toFixed(1),
        trend: revenueGrowth >= 0 ? 'up' : 'down',
      },
      totalProducts: {
        value: totalProducts,
      },
      totalUsers: {
        value: totalUsers,
      },
      monthlyOrders: {
        value: monthlyOrders,
      },
      monthlyRevenue: {
        value: monthlyRevenue,
      },
    },
    recentOrders,
    topSellingProducts,
    ordersByStatus,
    revenueByMonth: revenueByMonth.map((item) => ({
      month: `${item._id.year}-${String(item._id.month).padStart(2, '0')}`,
      revenue: item.revenue,
      orders: item.orders,
    })),
  };

  return successResponse(dashboard, 'Dashboard data retrieved successfully');
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  return requireAdmin(request, (req, user) => asyncHandler(getAdminDashboardHandler)(req, user));
}
