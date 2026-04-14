const Notice = require('../models/noticeModel');

// @desc    Create new notice
// @route   POST /api/notices
exports.createNotice = async (req, res) => {
  try {
    const { title, content, category } = req.body;
    
    // Auto-publish for admins, pending for faculty
    const status = req.user.role === 'admin' ? 'published' : 'pending';

    const notice = await Notice.create({
      title,
      content,
      category,
      status,
      author: req.user.name,
      authorId: req.user.id,
      role: req.user.role
    });

    res.status(201).json({ success: true, data: notice });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc    Get all notices based on user role
// @route   GET /api/notices
exports.getNotices = async (req, res) => {
  try {
    let query = {};
    const { role, id } = req.user;

    if (role === 'student') {
      query = { status: 'published' };
    } else if (role === 'faculty') {
      // Show all published + drafts owned by this specific faculty member
      query = { $or: [{ status: 'published' }, { authorId: id }] };
    } else if (role === 'admin') {
      // Admin can use ?status=pending in URL to moderate
      if (req.query.status) query.status = req.query.status;
    }

    const notices = await Notice.find(query).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: notices.length, data: notices });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// @desc    Update notice status (Approve/Reject)
// @route   PUT /api/notices/moderate/:id
exports.moderateNotice = async (req, res) => {
  try {
    const { status } = req.body;
    
    let notice = await Notice.findById(req.params.id);
    if (!notice) return res.status(404).json({ message: "Notice not found" });

    notice = await Notice.findByIdAndUpdate(req.params.id, { status }, { 
      new: true, 
      runValidators: true 
    });

    res.status(200).json({ success: true, data: notice });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc    Delete notice
// @route   DELETE /api/notices/:id
exports.deleteNotice = async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id);
    if (!notice) return res.status(404).json({ message: "Notice not found" });

    // Security check: Only author or admin can delete
    if (notice.authorId.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ message: "User not authorized to delete this notice" });
    }

    await notice.deleteOne();
    res.status(200).json({ success: true, message: "Notice removed" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};