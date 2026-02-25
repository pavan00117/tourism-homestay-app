const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

// Since we are moving to Firebase Admin SDK, the user will need to provide a serviceAccount.json later.
// For now, we set up the structure and initialize it when possible. 
// A real deployment would use environment variables or a service account key file.

let db = null;

const connectDB = async () => {
    try {
        // In a real application, you would load the service account key JSON file here
        // Example: const serviceAccount = require('./serviceAccount.json');
        // initializeApp({ credential: cert(serviceAccount) });

        // For now, we will initialize with default application credentials
        // Note: If you do not have credentials set up, this will fail in production.
        // The user will need to add their Firebase Service Account JSON.
        initializeApp();
        db = getFirestore();
        console.log('Firebase Firestore Connected');
    } catch (error) {
        console.error(`Firebase Initialization Error: ${error.message}`);
        console.log('Instructions: You need to add a Firebase Service Account key (serviceAccount.json) to connect successfully.');
    }
};

const getDB = () => db;

module.exports = { connectDB, getDB };
