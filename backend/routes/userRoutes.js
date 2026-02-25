const express = require('express');
const router = express.Router();
const { getUsers, deleteUser } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

router.route('/').get(protect, authorize('admin', 'host'), getUsers);
router.route('/:id').delete(protect, authorize('admin'), deleteUser);

module.exports = router;
