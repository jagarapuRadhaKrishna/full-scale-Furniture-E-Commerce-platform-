import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/db/mongodb';
import { ORDER_COLLECTIONS, IOrder, OrderModel, IOrderTracking } from '@/models/Order';
import { requireAuth, requireAdmin, optionalAuth } from '@/lib/middleware/auth';
import { asyncHandler, successResponse } from '@/lib/middleware/errorHandler';
import { ObjectId } from 'mongodb';

/**
 * GET /api/orders/[id] - Get order by ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  return asyncHandler(async () => {
    const user = await optionalAuth(request);
    if (!user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;
    const db = await getDatabase();
    const ordersCollection = db.collection<IOrder>(ORDER_COLLECTIONS.ORDERS);
    const orderTrackingCollection = db.collection<IOrderTracking>(ORDER_COLLECTIONS.ORDER_TRACKING);

    const order = await ordersCollection.findOne({ _id: new ObjectId(id) });

    if (!order) {
      return NextResponse.json({ success: false, error: 'Order not found' }, { status: 404 });
    }

    // Non-admin users can only view their own orders
    if (user.role !== 'Admin' && order.userId.toString() !== user._id.toString()) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 403 });
    }

    // Get tracking history
    const tracking = await orderTrackingCollection
      .find({ orderId: order._id })
      .sort({ timestamp: -1 })
      .toArray();

    return successResponse({ order, tracking }, 'Order retrieved successfully');
  })(request);
}

/**
 * PUT /api/orders/[id] - Update order status (Admin only)
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  return requireAdmin(request, async (req, user) => {
    return asyncHandler(async () => {
      const { id } = params;
      const body = await req.json();
      const { status, trackingNumber, deliveryPartnerId, adminNotes } = body;

      const db = await getDatabase();
      const ordersCollection = db.collection<IOrder>(ORDER_COLLECTIONS.ORDERS);
      const orderTrackingCollection = db.collection<IOrderTracking>(ORDER_COLLECTIONS.ORDER_TRACKING);

      const order = await ordersCollection.findOne({ _id: new ObjectId(id) });

      if (!order) {
        return NextResponse.json({ success: false, error: 'Order not found' }, { status: 404 });
      }

      const updateData: any = {
        updatedAt: new Date(),
      };

      if (status) updateData.status = status;
      if (trackingNumber) updateData.trackingNumber = trackingNumber;
      if (deliveryPartnerId) updateData.deliveryPartnerId = new ObjectId(deliveryPartnerId);
      if (adminNotes) updateData.adminNotes = adminNotes;

      // Set actual delivery date if status is Delivered
      if (status === 'Delivered') {
        updateData.actualDeliveryDate = new Date();
      }

      await ordersCollection.updateOne({ _id: new ObjectId(id) }, { $set: updateData });

      // Add tracking entry
      if (status) {
        await orderTrackingCollection.insertOne({
          orderId: new ObjectId(id),
          status,
          message: `Order status updated to ${status}`,
          updatedBy: user._id,
          updatedByRole: user.role,
          timestamp: new Date(),
        });
      }

      const updatedOrder = await ordersCollection.findOne({ _id: new ObjectId(id) });

      return successResponse(updatedOrder, 'Order updated successfully');
    })();
  });
}

/**
 * DELETE /api/orders/[id] - Cancel order
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  return requireAuth(request, async (req, user) => {
    return asyncHandler(async () => {
      const { id } = params;
      const db = await getDatabase();
      const ordersCollection = db.collection<IOrder>(ORDER_COLLECTIONS.ORDERS);
      const orderTrackingCollection = db.collection<IOrderTracking>(ORDER_COLLECTIONS.ORDER_TRACKING);

      const order = await ordersCollection.findOne({ _id: new ObjectId(id) });

      if (!order) {
        return NextResponse.json({ success: false, error: 'Order not found' }, { status: 404 });
      }

      // Check permissions
      if (user.role !== 'Admin' && order.userId.toString() !== user._id.toString()) {
        return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 403 });
      }

      // Check if order can be cancelled
      if (!OrderModel.canCancel(order.status)) {
        return NextResponse.json(
          { success: false, error: `Cannot cancel order with status: ${order.status}` },
          { status: 400 }
        );
      }

      await ordersCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { status: 'Cancelled', updatedAt: new Date() } }
      );

      // Add tracking entry
      await orderTrackingCollection.insertOne({
        orderId: new ObjectId(id),
        status: 'Cancelled',
        message: 'Order cancelled by customer',
        updatedBy: user._id,
        updatedByRole: user.role,
        timestamp: new Date(),
      });

      return successResponse(null, 'Order cancelled successfully');
    })();
  });
}
