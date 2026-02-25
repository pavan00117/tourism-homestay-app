const express = require('express');
const router = express.Router();
const {
    createBooking,
    getMyBookings,
    getHostBookings,
    updateBookingStatus,
} = require('../controllers/bookingController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

router.route('/').post(protect, authorize('tourist', 'admin'), createBooking);
router.route('/mybookings').get(protect, getMyBookings);
router.route('/host').get(protect, authorize('host', 'admin'), getHostBookings);
router.route('/:id/status').put(protect, authorize('host', 'admin'), updateBookingStatus);

module.exports = router;
