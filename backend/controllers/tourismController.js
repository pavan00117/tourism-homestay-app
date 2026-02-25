const { getDB } = require('../config/db');

const getTourismPlacesCol = () => getDB().collection('tourismPlaces');

// @desc    Get all tourism places
// @route   GET /api/tourismPlaces
// @access  Public
const getTourismPlaces = async (req, res, next) => {
    try {
        const { city, category } = req.query;

        const snapshot = await getTourismPlacesCol().get();

        let places = snapshot.docs.map(doc => ({
            _id: doc.id,
            ...doc.data()
        }));

        // Filter in memory for simplicity with Firestore querying limitations on multi-fields
        if (city) {
            places = places.filter(p =>
                p.location && p.location.city && p.location.city.toLowerCase() === city.toLowerCase()
            );
        }

        if (category) {
            places = places.filter(p => p.category === category);
        }

        res.status(200).json(places);
    } catch (error) {
        next(error);
    }
};

// @desc    Get single tourism place
// @route   GET /api/tourismPlaces/:id
// @access  Public
const getTourismPlaceById = async (req, res, next) => {
    try {
        const docRef = getTourismPlacesCol().doc(req.params.id);
        const docSnap = await docRef.get();

        if (!docSnap.exists) {
            res.status(404);
            throw new Error('Tourism place not found');
        }

        res.status(200).json({ _id: docSnap.id, ...docSnap.data() });
    } catch (error) {
        next(error);
    }
};

// @desc    Create new tourism place
// @route   POST /api/tourismPlaces
// @access  Private/Admin
const createTourismPlace = async (req, res, next) => {
    try {
        const placeData = {
            ...req.body,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        const docRef = await getTourismPlacesCol().add(placeData);

        res.status(201).json({
            _id: docRef.id,
            ...placeData
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update tourism place
// @route   PUT /api/tourismPlaces/:id
// @access  Private/Admin
const updateTourismPlace = async (req, res, next) => {
    try {
        const placeId = req.params.id;
        const docRef = getTourismPlacesCol().doc(placeId);
        const docSnap = await docRef.get();

        if (!docSnap.exists) {
            res.status(404);
            throw new Error('Tourism place not found');
        }

        const updateData = {
            ...req.body,
            updatedAt: new Date().toISOString()
        };

        await docRef.update(updateData);

        res.status(200).json({
            _id: placeId,
            ...docSnap.data(),
            ...updateData
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete tourism place
// @route   DELETE /api/tourismPlaces/:id
// @access  Private/Admin
const deleteTourismPlace = async (req, res, next) => {
    try {
        const docRef = getTourismPlacesCol().doc(req.params.id);
        const docSnap = await docRef.get();

        if (!docSnap.exists) {
            res.status(404);
            throw new Error('Tourism place not found');
        }

        await docRef.delete();

        res.status(200).json({ message: 'Tourism place removed' });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getTourismPlaces,
    getTourismPlaceById,
    createTourismPlace,
    updateTourismPlace,
    deleteTourismPlace,
};
