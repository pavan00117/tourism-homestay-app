const express = require('express');
const router = express.Router();
const {
    getHomestays,
    getHomestayById,
    createHomestay,
    updateHomestay,
    deleteHomestay,
} = require('../controllers/homestayController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

router
    .route('/')
    .get(getHomestays)
    .post(protect, authorize('host', 'admin'), createHomestay);

router
    .route('/:id')
    .get(getHomestayById)
    .put(protect, authorize('host', 'admin'), updateHomestay)
    .delete(protect, authorize('host', 'admin'), deleteHomestay);

module.exports = router;
