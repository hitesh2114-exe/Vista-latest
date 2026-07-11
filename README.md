# Vista

Vista is a full-stack property listing and reservation platform built using the MERN stack. It allows users to explore properties, manage their own listings, share reviews, and reserve available stays for selected dates.

The project implements practical full-stack concepts including authentication, authorization, reservation management, database relationships, and frontend-backend integration.

## Live Demo

**Live Application:** https://vista-latest-1.onrender.com/

> **Note:** Before testing the live application, please review the [Deployment Notes and Current Limitations](#deployment-notes-and-current-limitations) section.

## About the Project

Vista is designed to demonstrate the development of a complete full-stack web application beyond basic CRUD operations. It combines property management, user authentication, reviews, and reservations into a single platform while focusing on practical application workflows and real-world frontend-backend integration.

## Key Features

* User signup, login, and session-based authentication.
* Explore and view detailed property listings.
* Create, update, and delete owned property listings.
* Add reviews and ratings to properties.
* Reserve properties for selected check-in and check-out dates.
* Availability checking to prevent overlapping reservations.
* Dynamic reservation price calculation.
* View booked properties through **My Trips**.
* Manage owned properties through **My Listings**.
* Responsive and interactive user interface.

## Tech Stack

### Frontend
React.js, Vite, React Router DOM, Material UI, Axios, MUI Date Pickers, Day.js, Swiper.js, and Motion.

### Backend
Node.js, Express.js, MongoDB, and Mongoose.

### Authentication
Passport.js, Passport Local Mongoose, Express Session, and Connect Mongo.

### Image Hosting
Cloudinary.

### Deployment
Render and MongoDB Atlas.

## Project Architecture

Vista follows a client-server architecture where the React frontend communicates with the Node.js and Express backend through REST APIs. The backend handles application logic and interacts with MongoDB using Mongoose, while Cloudinary hosts property images and MongoDB stores their URLs along with the listing data.

## Core Functionality

Vista uses session-based authentication with Passport.js to manage user access and protect restricted operations. Authenticated users can create and manage property listings, while ownership-based authorization ensures that only listing owners can modify or delete their properties.

The reservation system allows users to select stay dates and create bookings while checking existing reservations to prevent date conflicts. Users can view their bookings through **My Trips** and manage their properties through **My Listings**. Reviews and ratings allow users to share feedback on individual property listings.

## Deployment Notes and Current Limitations

Vista uses session-based authentication with Passport.js and cookies. Since the frontend and backend are deployed on separate origins, **browsers must allow the required cross-site cookies for authenticated sessions to work correctly**. **Strict third-party cookie settings may affect login and other protected features.**

The backend is hosted on Render and may enter an inactive state after a period of inactivity. As a result, **the first request may take one or two minutes while the backend service becomes active again**. Subsequent requests generally respond normally.

Vista is currently a portfolio and learning-focused project. Features such as **online payments, email notifications, and advanced administrative tools are outside the current scope of the application**.

## Installation and Setup

1. Clone the repository:
   `git clone https://github.com/hitesh2114-exe/Vista-latest.git`

2. Install backend dependencies:
   `cd Backend`
   `npm install`

3. Install frontend dependencies:
   `cd Frontend`
   `npm install`

4. Configure the required environment variables in the backend `.env` file.

5. Start the backend server:
   `node app.js`

6. Start the frontend development server:
   `npm run dev`

The frontend and backend must both be running for the application to work locally.

## Environment Variables

Create a `.env` file inside the `Backend` directory and configure the following variables:

* `PORT`
* `MONGODB_URI`
* `SECRET`
* `SESSION_SECRET`

These variables are used for the server configuration, MongoDB connection, and session management. **Never commit the `.env` file or expose secret values in the repository.**

## Future Improvements

* Online payment integration.
* Advanced property search and filtering.
* Wishlist and saved properties.
* Multiple images for individual property listings.
* Email confirmations and notifications.
* Map and location-based property discovery.
* Administrative dashboard and management tools.

## Detailed Documentation

For a detailed explanation of Vista's architecture, authentication flow, database models, reservation system, API routes, and implementation decisions, refer to the `PROJECT_DOCUMENTATION.md` file.

## Author

**Hitesh Pandey**
GitHub: hitesh2114-exe

## License
This project is licensed under the MIT License. See the `LICENSE` file for more information.

