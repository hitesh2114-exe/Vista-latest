# Vista

Vista is a full-stack property listing and reservation platform designed to provide a simple and interactive experience for exploring and booking properties. Inspired by modern accommodation platforms, Vista allows users to browse available listings, view detailed property information, create and manage their own listings, and reserve properties for selected dates.

The platform brings together property management, user authentication, reviews, image uploads, and reservation handling in a single application. Vista is developed using the MERN stack with a focus on building and understanding the core workflows of a real-world full-stack web application.

## About the Project

Vista is a full-stack web application that explores and implements the core concepts involved in building a modern property listing and reservation platform. The project goes beyond a basic CRUD application by incorporating real-world application workflows such as user authentication, authorization, property ownership, cloud-based image storage, reviews, and reservation management.

The application follows a client-server architecture where the React frontend communicates with a Node.js and Express backend through REST APIs. MongoDB stores and manages application data, while different models and relationships connect users, property listings, reviews, and reservations.

A major focus of Vista is its functional reservation system, which manages property availability and prevents overlapping bookings. The project also demonstrates cross-origin authentication, session management, cloud image uploads, frontend and backend integration, and the deployment of a complete MERN application.

## Key Features

* **User Authentication** – Users can create an account, log in, and log out using a session-based authentication system.

* **Property Exploration** – Users can browse available property listings and view detailed information about individual properties.

* **Property Management** – Authenticated users can create new property listings and manage the properties they own.

* **Cloud Image Uploads** – Property images are uploaded and stored using Cloudinary instead of being stored directly on the backend server.

* **Reviews and Ratings** – Users can share reviews and ratings on property listings, with authorization checks for review management.

* **Property Reservations** – Users can select check-in and check-out dates, choose the number of guests, and reserve available properties.

* **Availability Management** – Existing reservations are checked to prevent overlapping bookings, and reserved dates are reflected in the booking calendar.

* **Dynamic Price Calculation** – The total reservation price is calculated according to the selected stay duration and the property's price.

* **My Trips** – Users can view the properties they have reserved along with their booking information.

* **My Listings** – Property owners can view and manage all listings created by them from their profile.

* **Owner-Based Authorization** – Only the owner of a property can perform restricted operations such as modifying or deleting their listing.

* **Responsive User Interface** – The frontend is designed using React and Material UI to provide an interactive and responsive experience across different screen sizes.

## Tech Stack

### Frontend

* **React.js** – Used to build the component-based user interface.
* **Vite** – Provides the frontend development and build environment.
* **React Router DOM** – Handles client-side routing and navigation.
* **Material UI (MUI)** – Used for UI components and responsive interface elements.
* **Axios** – Handles HTTP communication between the frontend and backend.
* **MUI Date Pickers & Day.js** – Used for reservation date selection and date handling.
* **Swiper.js** – Provides interactive sliders and carousel components.
* **Motion** – Used to add animations and smooth UI transitions.

### Backend

* **Node.js** – JavaScript runtime used to execute the backend application.
* **Express.js** – Used to build REST APIs and handle server-side routing.
* **MongoDB** – Stores users, property listings, reviews, reservations, and application data.
* **Mongoose** – Provides schema-based data modeling and MongoDB interaction.

### Authentication and Session Management

* **Passport.js** – Handles user authentication.
* **Passport Local & Passport Local Mongoose** – Provide local username and password authentication.
* **Express Session** – Maintains authenticated user sessions.
* **Connect Mongo** – Stores application sessions in MongoDB.
* **Cookie Parser** – Handles cookies used by the application.

### Image Management

* **Cloudinary** – Used to host property images externally.
* **Image URL Integration** – Cloudinary-hosted image URLs are provided while creating listings and are stored with the listing data in MongoDB.

### Deployment and Cloud Services

* **Render** – Hosts the frontend and backend services.
* **MongoDB Atlas** – Provides the cloud-hosted MongoDB database.
* **Cloudinary** – Provides cloud-based hosting for property images.

## Project Architecture

Vista follows a client-server architecture where the frontend and backend operate as separate applications. The React frontend is responsible for the user interface, navigation, form handling, and displaying property and reservation data. It communicates with the backend using HTTP requests through Axios.

The backend is built with Node.js and Express.js and exposes REST APIs for authentication, property listings, reviews, and reservations. Controllers handle the application logic, while Mongoose models define the structure of the data and manage communication with MongoDB.

MongoDB Atlas is used as the cloud-hosted database for storing users, listings, reviews, reservations, and session data. Property images are hosted externally using Cloudinary, and their URLs are stored as part of the listing data in MongoDB.

The overall application flow is:

React Frontend → Axios / REST APIs → Express Backend → Controllers → Mongoose Models → MongoDB Atlas

Authentication sessions are maintained using Passport.js and Express Session, while session data is stored in MongoDB using Connect Mongo.

## Authentication and Authorization

Vista uses session-based authentication to manage user accounts and authenticated sessions. Passport.js, along with Passport Local and Passport Local Mongoose, handles local username and password authentication. User passwords are securely managed through Passport Local Mongoose instead of being stored directly in plain text.

Express Session is used to create and maintain authenticated user sessions. Session data is stored in MongoDB using Connect Mongo, allowing sessions to persist outside the backend server's memory. The browser sends the session cookie with authenticated requests, while Axios uses credential-enabled requests to communicate with the backend.

Protected backend routes verify the authentication status of the user before allowing access to restricted operations. Vista also applies authorization checks based on resource ownership. For example, only the owner of a property listing can modify or delete that listing, and review-related operations are restricted according to the authenticated user.

This authentication and authorization system helps separate public application features from user-specific actions while maintaining secure access to protected resources.
