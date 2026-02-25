const { getDB } = require('../config/db');

// Helper to get collections
const getReviewsCol = () => getDB().collection('reviews');
const getHomestaysCol = () => getDB().collection('homestays');
const getBookingsCol = () => getDB().collection('bookings');
const getUsersCol = () => getDB().collection('users');

// @desc    Get reviews for a homestay
// @route   GET /api/reviews/:homestayId
// @access  Public
const getReviews = async (req, res, next) => {
    try {
        const snapshot = await getReviewsCol().where('homestayId', '==', req.params.homestayId).get();

        let reviews = snapshot.docs.map(doc => ({
            _id: doc.id,
            ...doc.data()
        }));

        // Populate userId manually
        const usersCol = getUsersCol();
        for (let review of reviews) {
            try {
                const userDoc = await usersCol.doc(review.userId).get();
                if (userDoc.exists) {
                    review.userId = {
                        _id: userDoc.id,
                        name: userDoc.data().name
                    };
                }
            } catch (e) {
                console.error("Error populating user", e);
            }
        }

        res.status(200).json(reviews);
    } catch (error) {
        next(error);
    }
};

// @desc    Add review
// @route   POST /api/reviews
// @access  Private/Tourist
const addReview = async (req, res, next) => {
    try {
        const { homestayId, rating, comment } = req.body;
        const userId = req.user.id;

        // Check if homestay exists
        const homestayDoc = await getHomestaysCol().doc(homestayId).get();

        if (!homestayDoc.exists) {
            res.status(404);
            throw new Error('Homestay not found');
        }

        // Check if the user has actually booked this homestay before allowing a review
        if (req.user.role !== 'admin') {
            const bookingsSnap = await getBookingsCol()
                .where('userId', '==', userId)
                .where('homestayId', '==', homestayId)
                .where('status', '==', 'confirmed')
                .get();

            if (bookingsSnap.empty) {
                res.status(400);
                throw new Error('You need a confirmed booking to leave a review for this homestay');
            }
        }

        // Ensure one review per user per homestay
        const existingReviewsSnap = await getReviewsCol()
            .where('userId', '==', userId)
            .where('homestayId', '==', homestayId)
            .get();

        if (!existingReviewsSnap.empty) {
            res.status(400);
            throw new Error('You have already reviewed this homestay');
        }

        const reviewData = {
            homestayId,
            userId,
            rating: Number(rating),
            comment,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        const docRef = await getReviewsCol().add(reviewData);

        // After saving a review, calculate and update average rating (manual aggregation)
        await updateAverageRating(homestayId);

        res.status(201).json({
            _id: docRef.id,
            ...reviewData
        });
    } catch (error) {
        next(error);
    }
};

const updateAverageRating = async (homestayId) => {
    try {
        const snapshot = await getReviewsCol().where('homestayId', '==', homestayId).get();
        if (snapshot.empty) return;

        const totalRating = snapshot.docs.reduce((sum, doc) => sum + doc.data().rating, 0);
        const averageRating = totalRating / snapshot.docs.length;

        await getHomestaysCol().doc(homestayId).update({
            averageRating
        });
    } catch (e) {
        console.error("Error updating average rating:", e);
    }
}

module.exports = {
    getReviews,
    addReview,
};
