const mongoose = require('mongoose');

const demoBookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],
  contactInfo: {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    }
  },
  address: {
    addressLine1: String,
    addressLine2: String,
    city: String,
    state: String,
    postalCode: String,
    country: String
  },
  preferredDate: {
    type: Date,
    required: true
  },
  preferredTimeSlot: {
    type: String,
    enum: ['morning', 'afternoon', 'evening'],
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending'
  },
  notes: String,
  technicianNotes: String,
  confirmedDate: Date,
  completedAt: Date,
  cancelledAt: Date,
  cancellationReason: String
}, {
  timestamps: true
});

const DemoBooking = mongoose.model('DemoBooking', demoBookingSchema);

module.exports = DemoBooking;
