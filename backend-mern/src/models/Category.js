const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Category name is required'],
    unique: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  description: String,
  image: String,
  bannerImage: String,
  icon: String,
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    default: null
  },
  isActive: {
    type: Boolean,
    default: true
  },
  sortOrder: {
    type: Number,
    default: 0
  },
  seo: {
    title: String,
    description: String,
    keywords: [String]
  }
}, {
  timestamps: true
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
