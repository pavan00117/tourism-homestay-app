const { getDB } = require('../config/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Helper to get users collection
const getUsersCol = () => getDB().collection('users');

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body;

        const usersCol = getUsersCol();

        // Check if user exists (Firestore doesn't have unique constraints, so manual check)
        const snapshot = await usersCol.where('email', '==', email).get();

        if (!snapshot.empty) {
            res.status(400);
            throw new Error('User already exists');
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user object
        const newUser = {
            name,
            email,
            password: hashedPassword, // Store hashed pass in Firestore
            role: role || 'tourist',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        // Save to Firestore
        const docRef = await usersCol.add(newUser);

        res.status(201).json({
            _id: docRef.id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
            token: generateToken(docRef.id),
        });

    } catch (error) {
        next(error);
    }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const usersCol = getUsersCol();

        // Find the user by email
        const snapshot = await usersCol.where('email', '==', email).get();

        if (snapshot.empty) {
            res.status(401);
            throw new Error('Invalid email or password');
        }

        // Get the first matching document
        const userDoc = snapshot.docs[0];
        const user = userDoc.data();

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            res.json({
                _id: userDoc.id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(userDoc.id),
            });
        } else {
            res.status(401);
            throw new Error('Invalid email or password');
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res, next) => {
    try {
        // req.user logic is populated by our updated auth middleware
        res.status(200).json(req.user);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    registerUser,
    loginUser,
    getMe,
};
