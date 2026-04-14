const mongoose = require('mongoose');

const NoticeSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: [true, 'Please add a notice title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  content: { 
    type: String, 
    required: [true, 'Please add notice content'] 
  },
  category: { 
    type: String, 
    enum: ['Academic', 'Event', 'System', 'Placement'], 
    default: 'Academic' 
  },
  status: { 
    type: String, 
    enum: ['pending', 'published', 'rejected'], 
    default: 'pending' 
  },
  author: { 
    type: String, 
    required: true 
  }, 
  authorId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  role: { 
    type: String, 
    required: true,
    enum: ['admin', 'faculty', 'student']
  }
}, { timestamps: true });

module.exports = mongoose.model('Notice', NoticeSchema);