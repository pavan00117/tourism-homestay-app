const { getDB } = require('../config/db');

// Helper to get users collection
const getUsersCol = () => getDB().collection('users');

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = async (req, res, next) => {
    try {
        const snapshot = await getUsersCol().get();

        // Convert Firestore docs to JSON array
        const users = snapshot.docs.map(doc => ({
            _id: doc.id,
            ...doc.data()
        }));

        res.json(users);
    } catch (error) {
        next(error);
    }
};

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const userRef = getUsersCol().doc(userId);
        const doc = await userRef.get();

        if (!doc.exists) {
            res.status(404);
            throw new Error('User not found');
        }

        await userRef.delete();
        res.json({ message: 'User removed' });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getUsers,
    deleteUser,
};
