const jwt = require('jsonwebtoken');
const { getDB } = require('../config/db');

const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from the token using Firestore
            const usersCol = getDB().collection('users');
            const docRef = usersCol.doc(decoded.id);
            const docSnap = await docRef.get();

            if (!docSnap.exists) {
                throw new Error('User not found');
            }

            req.user = docSnap.data();
            req.user.id = docSnap.id;
            delete req.user.password; // Exclude password from the req.user object

            next();
        } catch (error) {
            console.error(error);
            res.status(401);
            return next(new Error('Not authorized, token failed'));
        }
    }

    if (!token) {
        res.status(401);
        return next(new Error('Not authorized, no token'));
    }
};

module.exports = { protect };
