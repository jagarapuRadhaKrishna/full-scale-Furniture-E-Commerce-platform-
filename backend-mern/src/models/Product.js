const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [255, 'Product name cannot exceed 255 characters']
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  description: {
    type: String,
    required: [true, 'Product description is required']
  },
  shortDescription: {
    type: String,
    maxlength: 500
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Category is required']
  },
  subcategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subcategory'
  },
  sku: {
    type: String,
    required: true,
    unique: true
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: 0
  },
  salePrice: {
    type: Number,
    min: 0
  },
  costPrice: {
    type: Number,
    min: 0
  },
  stock: {
    quantity: {
      type: Number,
      default: 0,
      min: 0
    },
    lowStockThreshold: {
      type: Number,
      default: 5
    }
  },
  dimensions: {
    length: Number,
    width: Number,
    height: Number,
    unit: {
      type: String,
      enum: ['cm', 'inch', 'ft'],
      default: 'inch'
    }
  },
  weight: {
    value: Number,
    unit: {
      type: String,
      enum: ['kg', 'lb'],
      default: 'kg'
    }
  },
  material: String,
  color: String,
  brand: String,
  warrantyPeriod: String,
  careInstructions: String,
  features: [String],
  specifications: mongoose.Schema.Types.Mixed,
  images: [{
    url: String,
    alt: String,
    isPrimary: Boolean
  }],
  has360View: {
    type: Boolean,
    default: false
  },
  model3dUrl: String,
  isFeatured: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isCustomizable: {
    type: Boolean,
    default: false
  },
  assemblyRequired: {
    type: Boolean,
    default: false
  },
  ratings: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    }
  },
  totalSales: {
    type: Number,
    default: 0
  },
  views: {
    type: Number,
    default: 0
  },
  seo: {
    title: String,
    description: String,
    keywords: [String]
  },
  tags: [String]
}, {
  timestamps: true
});

// Indexes for better query performance
productSchema.index({ slug: 1 });
productSchema.index({ category: 1 });
productSchema.index({ price: 1 });
productSchema.index({ 'ratings.average': -1 });
productSchema.index({ createdAt: -1 });
productSchema.index({ name: 'text', description: 'text' });

// Virtual for discount percentage
productSchema.virtual('discountPercentage').get(function() {
  if (this.salePrice && this.price) {
    return Math.round(((this.price - this.salePrice) / this.price) * 100);
  }
  return 0;
});

// Virtual for stock status
productSchema.virtual('stockStatus').get(function() {
  if (this.stock.quantity === 0) return 'out-of-stock';
  if (this.stock.quantity <= this.stock.lowStockThreshold) return 'low-stock';
  return 'in-stock';
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
