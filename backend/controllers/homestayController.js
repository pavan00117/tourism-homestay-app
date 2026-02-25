const { getDB } = require('../config/db');

// Helper to get collections
const getHomestaysCol = () => getDB().collection('homestays');
const getUsersCol = () => getDB().collection('users');

// @desc    Get all homestays
// @route   GET /api/homestays
// @access  Public
const getHomestays = async (req, res, next) => {
    try {
        const { city, minPrice, maxPrice } = req.query;

        let query = getHomestaysCol();

        // Note: Firestore has limitations on complex queries. 
        // We'll fetch and filter in memory for complex combinations for simplicity in this port,
        // though in a production app you'd want to structure data to query efficiently.
        const snapshot = await query.get();

        let homestays = snapshot.docs.map(doc => ({
            _id: doc.id,
            ...doc.data()
        }));

        // Apply filters
        if (city) {
            homestays = homestays.filter(h =>
                h.location && h.location.city && h.location.city.toLowerCase() === city.toLowerCase()
            );
        }

        if (minPrice) {
            homestays = homestays.filter(h => h.pricePerNight >= Number(minPrice));
        }

        if (maxPrice) {
            homestays = homestays.filter(h => h.pricePerNight <= Number(maxPrice));
        }

        // Populate hostId manually since Firestore doesn't have 'populate'
        const usersCol = getUsersCol();
        for (let homestay of homestays) {
            if (homestay.hostId) {
                try {
                    const hostDoc = await usersCol.doc(homestay.hostId).get();
                    if (hostDoc.exists) {
                        const hostData = hostDoc.data();
                        homestay.hostId = {
                            _id: hostDoc.id,
                            name: hostData.name,
                            email: hostData.email
                        };
                    }
                } catch (e) {
                    console.error("Error populating host", e);
                }
            }
        }

        res.status(200).json(homestays);
    } catch (error) {
        next(error);
    }
};

// @desc    Get single homestay
// @route   GET /api/homestays/:id
// @access  Public
const getHomestayById = async (req, res, next) => {
    try {
        const docRef = getHomestaysCol().doc(req.params.id);
        const docSnap = await docRef.get();

        if (!docSnap.exists) {
            res.status(404);
            throw new Error('Homestay not found');
        }

        const homestay = { _id: docSnap.id, ...docSnap.data() };

        // Populate Host manually
        if (homestay.hostId) {
            const hostDoc = await getUsersCol().doc(homestay.hostId).get();
            if (hostDoc.exists) {
                const hostData = hostDoc.data();
                homestay.hostId = {
                    _id: hostDoc.id,
                    name: hostData.name,
                    email: hostData.email
                };
            }
        }

        res.status(200).json(homestay);
    } catch (error) {
        next(error);
    }
};

// @desc    Create new homestay
// @route   POST /api/homestays
// @access  Private/Host
const createHomestay = async (req, res, next) => {
    try {
        const homestayData = {
            ...req.body,
            hostId: req.user.id,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        const docRef = await getHomestaysCol().add(homestayData);

        res.status(201).json({
            _id: docRef.id,
            ...homestayData
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update homestay
// @route   PUT /api/homestays/:id
// @access  Private/Host
const updateHomestay = async (req, res, next) => {
    try {
        const homestayId = req.params.id;
        const docRef = getHomestaysCol().doc(homestayId);
        const docSnap = await docRef.get();

        if (!docSnap.exists) {
            res.status(404);
            throw new Error('Homestay not found');
        }

        const homestay = docSnap.data();

        // Make sure user is homestay owner
        if (homestay.hostId !== req.user.id && req.user.role !== 'admin') {
            res.status(401);
            throw new Error('User not authorized to update this homestay');
        }

        const updateData = {
            ...req.body,
            updatedAt: new Date().toISOString()
        };

        await docRef.update(updateData);

        res.status(200).json({
            _id: homestayId,
            ...homestay,
            ...updateData
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete homestay
// @route   DELETE /api/homestays/:id
// @access  Private/Host
const deleteHomestay = async (req, res, next) => {
    try {
        const homestayId = req.params.id;
        const docRef = getHomestaysCol().doc(homestayId);
        const docSnap = await docRef.get();

        if (!docSnap.exists) {
            res.status(404);
            throw new Error('Homestay not found');
        }

        const homestay = docSnap.data();

        // Make sure user is homestay owner
        if (homestay.hostId !== req.user.id && req.user.role !== 'admin') {
            res.status(401);
            throw new Error('User not authorized to delete this homestay');
        }

        await docRef.delete();

        res.status(200).json({ message: 'Homestay removed' });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getHomestays,
    getHomestayById,
    createHomestay,
    updateHomestay,
    deleteHomestay,
};
