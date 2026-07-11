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

