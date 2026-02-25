const express = require('express');
const router = express.Router();
const {
    getTourismPlaces,
    getTourismPlaceById,
    createTourismPlace,
    updateTourismPlace,
    deleteTourismPlace,
} = require('../controllers/tourismController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

router
    .route('/')
    .get(getTourismPlaces)
    .post(protect, authorize('admin', 'host'), createTourismPlace);

router
    .route('/:id')
    .get(getTourismPlaceById)
    .put(protect, authorize('admin', 'host'), updateTourismPlace)
    .delete(protect, authorize('admin', 'host'), deleteTourismPlace);

module.exports = router;
