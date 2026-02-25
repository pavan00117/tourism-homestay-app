const { getDB } = require('../config/db');

// Helper to get collections
const getBookingsCol = () => getDB().collection('bookings');
const getHomestaysCol = () => getDB().collection('homestays');
const getUsersCol = () => getDB().collection('users');

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private/Tourist
const createBooking = async (req, res, next) => {
    try {
        const { homestayId, dates, totalPrice } = req.body;

        // Check if homestay exists
        const homestayDoc = await getHomestaysCol().doc(homestayId).get();

        if (!homestayDoc.exists) {
            res.status(404);
            throw new Error('Homestay not found');
        }

        const bookingData = {
            userId: req.user.id,
            homestayId,
            dates,
            totalPrice,
            status: 'pending',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        const docRef = await getBookingsCol().add(bookingData);

        res.status(201).json({
            _id: docRef.id,
            ...bookingData
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get all bookings for a user
// @route   GET /api/bookings/mybookings
// @access  Private/Tourist
const getMyBookings = async (req, res, next) => {
    try {
        const snapshot = await getBookingsCol().where('userId', '==', req.user.id).get();

        let bookings = snapshot.docs.map(doc => ({
            _id: doc.id,
            ...doc.data()
        }));

        // Populate homestayId
        for (let booking of bookings) {
            try {
                const homestayDoc = await getHomestaysCol().doc(booking.homestayId).get();
                if (homestayDoc.exists) {
                    const homestayData = homestayDoc.data();
                    booking.homestayId = {
                        _id: homestayDoc.id,
                        name: homestayData.name,
                        location: homestayData.location,
                        images: homestayData.images
                    };
                }
            } catch (e) {
                console.error("Error populating homestay", e);
            }
        }

        res.status(200).json(bookings);
    } catch (error) {
        next(error);
    }
};

// @desc    Get all bookings for a host's homestays
// @route   GET /api/bookings/host
// @access  Private/Host
const getHostBookings = async (req, res, next) => {
    try {
        // 1. Find all homestays owned by this host
        const homestaysSnapshot = await getHomestaysCol().where('hostId', '==', req.user.id).get();

        const homestayIds = homestaysSnapshot.docs.map(doc => doc.id);
        const homestaysMap = {};
        homestaysSnapshot.docs.forEach(doc => {
            homestaysMap[doc.id] = { _id: doc.id, name: doc.data().name };
        });

        if (homestayIds.length === 0) {
            return res.status(200).json([]);
        }

        // 2. Find bookings for those homestays
        // Firestore 'in' queries are limited to 10 elements. We fetch all bookings and filter manually if large.
        // For simplicity, we just fetch all bookings and filter. In prod, redesign data model or batch.
        const allBookingsSnap = await getBookingsCol().get();
        let bookings = allBookingsSnap.docs
            .map(doc => ({ _id: doc.id, ...doc.data() }))
            .filter(b => homestayIds.includes(b.homestayId));

        // Populate homestay and user
        const usersCol = getUsersCol();
        for (let booking of bookings) {
            booking.homestayId = homestaysMap[booking.homestayId];

            try {
                const userDoc = await usersCol.doc(booking.userId).get();
                if (userDoc.exists) {
                    booking.userId = {
                        _id: userDoc.id,
                        name: userDoc.data().name,
                        email: userDoc.data().email
                    };
                }
            } catch (e) {
                console.error("Error populating user", e);
            }
        }

        res.status(200).json(bookings);
    } catch (error) {
        next(error);
    }
};

// @desc    Update booking status
// @route   PUT /api/bookings/:id/status
// @access  Private/Host
const updateBookingStatus = async (req, res, next) => {
    try {
        const { status } = req.body;
        const bookingId = req.params.id;

        const docRef = getBookingsCol().doc(bookingId);
        const docSnap = await docRef.get();

        if (!docSnap.exists) {
            res.status(404);
            throw new Error('Booking not found');
        }

        const booking = docSnap.data();

        // Verify the user owns the homestay being booked
        const homestayDoc = await getHomestaysCol().doc(booking.homestayId).get();
        const homestay = homestayDoc.data();

        if (homestay.hostId !== req.user.id && req.user.role !== 'admin') {
            res.status(401);
            throw new Error('Not authorized to update this booking');
        }

        const updateData = { status, updatedAt: new Date().toISOString() };
        await docRef.update(updateData);

        res.status(200).json({
            _id: bookingId,
            ...booking,
            ...updateData
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createBooking,
    getMyBookings,
    getHostBookings,
    updateBookingStatus,
};
