const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Post title is required'],
    trim: true,
    maxlength: [120, 'Title cannot exceed 120 characters']
  },
  excerpt: {
    type: String,
    required: [true, 'Post excerpt is required'],
    trim: true,
    maxlength: [250, 'Excerpt cannot exceed 250 characters']
  },
  content: {
    type: String,
    required: [true, 'Article content is required']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Web Development', 'Frontend', 'Backend', 'DevOps', 'Career & Internship']
  },
  tags: {
    type: [String],
    default: []
  },
  author: {
    type: String,
    default: 'Kiran Kakade'
  },
  readTime: {
    type: String,
    default: '4 min read'
  },
  upvotes: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Post', postSchema);
