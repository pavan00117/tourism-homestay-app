# Tourist Support Platform Backend

This is the backend for the Tourist Support Platform, built using Node.js, Express, and MongoDB.

## Features

- **User Authentication**: Register, Login, JWT-based auth.
- **Role-based Access**: Roles for Tourist, Host, and Admin.
- **Homestay Management**: Hosts can add/update/delete homestays. Tourists can browse and search.
- **Tourism Places Management**: Admins can manage nearby tourism places.
- **Booking System**: Tourists can book homestays. Hosts can manage booking statuses.
- **Reviews & Ratings**: Tourists can leave reviews for homestays they have booked.

## Prerequisites

- Node.js installed
- MongoDB installed and running locally on standard port (27017) or a MongoDB Atlas URI.

## Installation & Setup

1. **Navigate to the backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables & Firebase**
   - Ensure you have a `.env` file in the root of the `backend` directory (JWT Secret, Port).
   - **CRITICAL**: You must set up a Firebase project and generate a Service Account Key (`serviceAccount.json`) and configure it in `config/db.js` for the database to work. Currently, it boots up with default credentials which will fail without a logged-in Google Cloud environment.

4. **Run the server**
   ```bash
   # Run in development mode (auto-restarts on code changes)
   npm run dev

   # Or run in production mode
   npm start
   ```
   The backend will start on `http://localhost:5000`.

## Connecting to React Frontend

In your React frontend, update your API calls to base URL `http://localhost:5000`. For example:

```javascript
// Using fetch or axios
const response = await fetch('http://localhost:5000/api/homestays');
const data = await response.json();
```
Make sure to send the JWT token in headers for protected routes:
```javascript
const response = await fetch('http://localhost:5000/api/auth/me', {
  headers: {
    'Authorization': `Bearer ${localToken}`
  }
});
```

## API Sample Requests

### 1. Register User (POST `/api/auth/register`)
**Request Body (JSON):**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "tourist" // optional, defaults to 'tourist', options: 'tourist', 'host', 'admin'
}
```
**Response:** Token and basic user info.

### 2. Login (POST `/api/auth/login`)
**Request Body (JSON):**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### 3. Add Homestay (POST `/api/homestays`) - **Requires Host Token**
**Request Headers:** `Authorization: Bearer <token>`
**Request Body (JSON):**
```json
{
  "name": "Cozy Mountain View",
  "description": "A beautiful view of the hills.",
  "location": {
    "city": "Manali",
    "state": "Himachal Pradesh"
  },
  "pricePerNight": 1500,
  "amenities": ["WiFi", "Food", "Parking"]
}
```

### 4. Get Homestays (GET `/api/homestays`) - **Public**
Query params supported: `?city=Manali&minPrice=1000&maxPrice=2000`

### 5. Add Tourism Place (POST `/api/tourismPlaces`) - **Requires Admin Token**
**Request Headers:** `Authorization: Bearer <token>`
**Request Body (JSON):**
```json
{
  "name": "Hadimba Temple",
  "description": "Historical wooden temple.",
  "location": {
    "city": "Manali",
    "state": "Himachal Pradesh"
  },
  "category": "Temple",
  "distanceFromHomestay": 2.5
}
```

### 6. Book Homestay (POST `/api/bookings`) - **Requires Tourist Token**
**Request Body:**
```json
{
  "homestayId": "662a5f...",
  "dates": {
    "checkIn": "2024-05-10",
    "checkOut": "2024-05-15"
  },
  "totalPrice": 7500
}
```

### 7. Review Homestay (POST `/api/reviews`) - **Requires Tourist Token (with confirmed booking)**
**Request Body:**
```json
{
  "homestayId": "662a5f...",
  "rating": 5,
  "comment": "Amazing stay, loved it!"
}
```
