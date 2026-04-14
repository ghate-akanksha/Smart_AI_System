const express = require('express');
const router = express.Router();
const { 
  createNotice, 
  getNotices, 
  moderateNotice, 
  deleteNotice 
} = require('../controllers/noticeController');
const { verifyToken, authorizeRoles } = require('../middleware/authMiddleware');

// 1. Get notices (Any authenticated user)
router.get('/', verifyToken, getNotices);

// 2. Create notice (Admin or Faculty only)
router.post('/', verifyToken, authorizeRoles('admin', 'faculty'), createNotice);

// 3. Moderate notice (Admin only)
router.put('/moderate/:id', verifyToken, authorizeRoles('admin'), moderateNotice);

// 4. Delete notice (Author or Admin)
router.delete('/:id', verifyToken, deleteNotice);

module.exports = router;