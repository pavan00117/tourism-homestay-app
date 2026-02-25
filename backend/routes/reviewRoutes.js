const express = require('express');
const router = express.Router();
const { getReviews, addReview } = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

router.route('/:homestayId').get(getReviews);
router.route('/').post(protect, authorize('tourist', 'admin'), addReview);

module.exports = router;
