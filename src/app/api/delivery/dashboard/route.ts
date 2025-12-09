import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/db/mongodb';
import { ORDER_COLLECTIONS, IOrder } from '@/models/Order';
import { requireDelivery } from '@/lib/middleware/auth';
import { asyncHandler, successResponse } from '@/lib/middleware/errorHandler';
import { ObjectId } from 'mongodb';

/**
 * GET /api/delivery/dashboard - Get delivery agent dashboard
 */
async function getDeliveryDashboardHandler(request: NextRequest, user: any): Promise<NextResponse> {
  const db = await getDatabase();
  const ordersCollection = db.collection<IOrder>(ORDER_COLLECTIONS.ORDERS);

  // Date ranges
  const today = new Date();
  const startOfDay = new Date(today.setHours(0, 0, 0, 0));
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  // Fetch delivery agent-specific data
  const [
    assignedOrders,
    todayDeliveries,
    monthlyDeliveries,
    completedDeliveries,
    pendingDeliveries,
    outForDelivery,
    recentDeliveries,
  ] = await Promise.all([
    // Total assigned orders
    ordersCollection.countDocuments({ deliveryPartnerId: user._id }),
    
    // Today's deliveries
    ordersCollection.countDocuments({
      deliveryPartnerId: user._id,
      status: { $in: ['Out for Delivery', 'Delivered'] },
      updatedAt: { $gte: startOfDay },
    }),
    
    // Monthly deliveries
    ordersCollection.countDocuments({
      deliveryPartnerId: user._id,
      status: 'Delivered',
      actualDeliveryDate: { $gte: startOfMonth },
    }),
    
    // Completed deliveries
    ordersCollection.countDocuments({
      deliveryPartnerId: user._id,
      status: 'Delivered',
    }),
    
    // Pending deliveries
    ordersCollection.countDocuments({
      deliveryPartnerId: user._id,
      status: { $in: ['Confirmed', 'Processing', 'Shipped'] },
    }),
    
    // Out for delivery
    ordersCollection.countDocuments({
      deliveryPartnerId: user._id,
      status: 'Out for Delivery',
    }),
    
    // Recent deliveries
    ordersCollection
      .find({ deliveryPartnerId: user._id })
      .sort({ updatedAt: -1 })
      .limit(20)
      .toArray(),
  ]);

  const dashboard = {
    kpis: {
      assignedOrders: { value: assignedOrders },
      todayDeliveries: { value: todayDeliveries },
      monthlyDeliveries: { value: monthlyDeliveries },
      completedDeliveries: { value: completedDeliveries },
      pendingDeliveries: { value: pendingDeliveries },
      outForDelivery: { value: outForDelivery },
    },
    recentDeliveries,
  };

  return successResponse(dashboard, 'Delivery dashboard data retrieved successfully');
}

/**
 * PUT /api/delivery/orders/[id] - Update delivery status
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  return requireDelivery(request, async (req, user) => {
    return asyncHandler(async () => {
      const { id } = params;
      const body = await req.json();
      const { status, location, notes } = body;

      const db = await getDatabase();
      const ordersCollection = db.collection<IOrder>(ORDER_COLLECTIONS.ORDERS);
      const orderTrackingCollection = db.collection(ORDER_COLLECTIONS.ORDER_TRACKING);

      const order = await ordersCollection.findOne({
        _id: new ObjectId(id),
        deliveryPartnerId: user._id,
      });

      if (!order) {
        return NextResponse.json(
          { success: false, error: 'Order not found or not assigned to you' },
          { status: 404 }
        );
      }

      const updateData: any = {
        status,
        updatedAt: new Date(),
      };

      if (status === 'Delivered') {
        updateData.actualDeliveryDate = new Date();
      }

      await ordersCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updateData }
      );

      // Add tracking entry
      await orderTrackingCollection.insertOne({
        orderId: new ObjectId(id),
        status,
        message: notes || `Status updated to ${status}`,
        location,
        updatedBy: user._id,
        updatedByRole: 'DeliveryAgent',
        timestamp: new Date(),
      });

      const updatedOrder = await ordersCollection.findOne({ _id: new ObjectId(id) });

      return successResponse(updatedOrder, 'Delivery status updated successfully');
    })();
  });
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  return requireDelivery(request, (req, user) => asyncHandler(getDeliveryDashboardHandler)(req, user));
}
