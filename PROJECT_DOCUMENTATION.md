# Vista - Project Documentation

This document provides a detailed technical overview of Vista, including its architecture, authentication system, database structure, property management, reservation workflow, and major implementation decisions.

Vista is a MERN stack property listing and reservation platform built using a separate React frontend and Node.js/Express backend. The application uses MongoDB for persistent data storage and follows a REST-based client-server architecture.

The purpose of this documentation is to explain how the major systems of Vista work internally and how the frontend, backend, database, and external services interact with each other.

## Project Architecture and Application Flow

Vista follows a client-server architecture in which the frontend and backend are developed and deployed as separate applications. The frontend is built using React and is responsible for rendering the user interface, handling navigation, managing form data, and displaying information received from the backend.

The frontend communicates with the backend through REST APIs using Axios. Requests related to authentication and protected resources are sent with credentials enabled so that the browser can include the session cookie with the request.

The backend is built using Node.js and Express.js. Express routes receive incoming API requests and pass them through the required authentication or authorization middleware before executing the related controller logic. Controllers process the request, interact with Mongoose models, and return the appropriate response to the frontend.

Mongoose acts as the data modeling layer between the Express backend and MongoDB Atlas. The application uses separate models for users, property listings, reviews, and reservations. References between these models are used to represent ownership and other relationships within the application.

Property images are hosted externally using Cloudinary. Vista stores the Cloudinary image URL as part of the listing data instead of storing image files directly on the backend server.

The general application flow is:

**React Frontend → Axios Request → Express Route → Middleware → Controller → Mongoose Model → MongoDB Atlas**

## Project Structure

Vista is divided into two main applications: `Frontend` and `Backend`. Keeping the client and server separate allows the user interface and backend services to be developed and deployed independently.

### Backend

The backend contains the Express server and the application's server-side logic. The project is organized into separate directories for configuration, controllers, middleware, models, and routes.

* **config** – Contains database and external service configuration.
* **controller** – Contains the application logic executed by API routes.
* **middleware** – Handles authentication and authorization checks.
* **model** – Defines the Mongoose schemas used by the application.
* **routes** – Defines the API endpoints and connects them with middleware and controllers.
* **index.js** – Initializes the Express application, middleware, database connection, sessions, Passport.js, and application routes.

### Frontend

The frontend is built using React and Vite. It contains reusable components and application pages responsible for rendering the interface and communicating with the backend.

The frontend handles navigation using React Router DOM, sends API requests through Axios, manages user interactions and form data, and updates the interface using data received from the backend.

This separation between frontend and backend keeps the application structure modular and makes individual parts of the system easier to maintain.


The response follows the reverse flow and is used by the React frontend to update the user interface.

## Database Models and Relationships

Vista uses **MongoDB** as its primary database and **Mongoose** for schema definition and data modeling. The application is mainly built around four models: **User, Listing, Review, and Reservation**. Mongoose references are used to connect related documents across collections.

### User Model

The **User model** represents registered users of the application. Authentication-related fields are managed using **Passport Local Mongoose**, which handles password hashing and authentication information.

A user can **create property listings, write reviews, and reserve properties**.

### Listing Model

The **Listing model** stores property-related information such as **title, description, location, country, price, and image details**. Each listing contains an **`owner` reference** that connects the property to the user who created it.

Listings also maintain references to their associated **reviews**.

### Review Model

The **Review model** stores the **rating and comment** submitted for a property. Each review contains an **`author` reference** that identifies the user who created the review.

Review references are connected with the related listing, allowing reviews to be populated and displayed with property information.

### Reservation Model

The **Reservation model** represents a property booking. Each reservation connects a **user with a listing** and stores reservation-related information such as **check-in date, check-out date, number of guests, and total price**.

These references allow Vista to retrieve **user-specific reservations** for the **My Trips** section and check existing reservations when determining **property availability**.

### Model Relationships

The main relationships within Vista can be represented as:

**User → owns → Listings**

**User → writes → Reviews**

**User → creates → Reservations**

**Listing → contains → Reviews**

**Listing → has → Reservations**

**Reservation → belongs to → User and Listing**

These relationships allow the application to connect **users, properties, reviews, and reservations** while keeping each type of data in a separate MongoDB collection.

## Authentication and Session Management

Vista uses **session-based authentication** implemented with **Passport.js**, **Passport Local**, and **Passport Local Mongoose**. Passport Local Mongoose manages user authentication information and securely handles **password hashing and salting**.

When a user successfully logs in, **Express Session** creates an authenticated session. Instead of storing session data in the backend server's memory, Vista uses **Connect Mongo** to store sessions in **MongoDB**. This allows session data to persist independently of the backend server instance.

The browser receives a **session cookie** after successful authentication. Since the frontend and backend are hosted on separate origins, Axios requests that require authentication are sent with **`withCredentials: true`**, allowing the browser to include the session cookie with cross-origin requests.

On the backend, protected routes use **`req.isAuthenticated()`** to verify whether the current request belongs to an authenticated user. Authentication middleware prevents unauthenticated users from accessing restricted operations such as **creating listings, making reservations, or accessing user-specific data**.

Vista also implements **authorization based on resource ownership**. Listing management operations are restricted to the **listing owner**, while review-related authorization uses the **review author** information.

The general authentication flow is:

**User Login → Passport Authentication → Express Session Created → Session Stored in MongoDB → Session Cookie Sent to Browser → Cookie Included with Authenticated Requests → `req.isAuthenticated()` Verifies User**

## Cross-Origin Cookies and CORS Configuration

Vista's **frontend and backend are deployed as separate services**, which means authenticated requests are made across different origins. To support session-based authentication in this architecture, both the frontend and backend must be configured to allow **credential-based cross-origin requests**.

The backend uses **CORS configuration with credentials enabled** and explicitly allows requests from the deployed frontend origin. On the frontend, Axios sends protected requests using **`withCredentials: true`**, allowing the browser to attach the session cookie to requests sent to the backend.

Session cookie settings are configured to support the deployed environment. The browser must accept the required **cross-site cookies** for the Passport.js session to remain available across frontend and backend requests.

**If a browser blocks the required third-party or cross-site cookies, the session cookie may not be sent with API requests. In such cases, the backend cannot identify the authenticated session and protected routes may return an **unauthorized response (`401`)**.**

The cross-origin authentication flow can be summarized as:

**React Frontend → Axios Request with Credentials → CORS Validation → Session Cookie Sent → Express Session → Passport.js → Authenticated Request**

## Property Listing Management and Ownership Flow

Vista allows authenticated users to **create, view, update, and delete property listings**. Each listing contains property information such as **title, description, location, country, price, and image details**.

When a new listing is created, the backend associates the listing with the currently authenticated user by storing the user's reference in the **`owner` field**. This relationship is used to identify the creator of the property and control listing management operations.

For update and delete operations, the backend verifies the **listing owner** before allowing the requested action. This prevents authenticated users from modifying or deleting properties created by other users.

When a listing is deleted, Vista also removes **reservations associated with that listing**. This cleanup prevents deleted property references from remaining in reservation records and avoids errors when users access sections such as **My Trips**.

The listing lifecycle can be summarized as:

**Authenticated User → Create Listing → Assign Owner → Store in MongoDB → View / Update / Delete Listing → Ownership Verification → Related Reservation Cleanup on Deletion**

## Image Handling and Cloudinary Integration

Vista uses **Cloudinary** to host property images externally instead of storing image files directly on the backend server. This keeps image storage separate from the application server and avoids depending on the backend's local file system.

While creating a property listing, a **Cloudinary-hosted image URL** is provided through the frontend. The React application stores the URL in the listing form data and sends it to the backend along with the remaining property information.

The backend stores the **image URL and related image information** as part of the listing document in MongoDB. When property data is requested, the frontend uses the stored URL to display the image.

The image handling flow is:

**Image Hosted on Cloudinary → Image URL Provided in Listing Form → React Sends Listing Data → Backend Stores Image URL → MongoDB → Frontend Displays Image Using Stored URL**

This approach keeps the current image handling process simple while allowing property images to be delivered through Cloudinary's cloud infrastructure.

## Reservation System and Availability Logic

Vista includes a reservation system that allows authenticated users to **select check-in and check-out dates, choose the number of guests, and reserve an available property**. A property owner is prevented from reserving their own listing.

Before creating a reservation, the backend checks existing bookings for the selected property. A reservation conflict exists when an existing booking overlaps with the requested date range. Vista checks this using the following condition:

**Existing Check-In < Requested Check-Out**

**Existing Check-Out > Requested Check-In**

If both conditions are true, the requested reservation overlaps with an existing booking and the backend prevents the new reservation from being created.

When the selected dates are available, Vista calculates the **number of nights and total reservation price**, creates a new reservation, and connects it with both the **authenticated user and selected listing**.

Existing reservation dates are retrieved by the frontend and reflected in the reservation calendar so that **already booked dates cannot be selected**.

The reservation flow can be summarized as:

**Select Dates → Choose Guests → Submit Reservation → Validate User and Listing → Check Date Overlap → Calculate Price → Create Reservation → Store in MongoDB → Refresh Booked Dates**

## My Trips and My Listings

Vista provides user-specific sections for managing **reservations and owned properties**.

### My Trips

The **My Trips** section retrieves reservations associated with the currently authenticated user. Reservation data is connected with the related listing information, allowing the frontend to display details about the properties booked by the user.

Users can view their reservation information and navigate to the related property listing directly from their trip details.

### My Listings

The **My Listings** section displays properties created by the currently authenticated user. Listings are filtered using the **owner reference**, ensuring that users only see properties associated with their own account.

From this section, property owners can access and manage their listings.

These features use the authenticated user session to provide **user-specific data without requiring the frontend to manually provide a user ID**.

## Review and Rating System

Vista allows authenticated users to **add ratings and reviews to property listings**. Each review stores the submitted **rating, comment, and author reference**, connecting the review to the user who created it.

When a review is added, its reference is also associated with the related listing. This allows the backend to retrieve and populate review information when property details are requested.

Review authorization is based on the **author reference**, ensuring that restricted review operations can only be performed by the appropriate user.

The review flow can be summarized as:

**Authenticated User → Submit Rating and Comment → Create Review → Assign Author → Connect Review with Listing → Store in MongoDB → Display with Property Details**

## API Routes and Backend Request Flow

Vista's backend is organized into separate routes for **user authentication, property listings, reviews, and reservations**. This separation keeps the API structure modular and makes each application feature easier to manage.

Incoming requests first reach the related **Express route**. Depending on the operation, the request may pass through **authentication or authorization middleware** before reaching the controller.

The controller handles the main application logic, interacts with the required **Mongoose model**, and sends the appropriate response back to the frontend.

The general backend request flow is:

**Frontend Request → Express Route → Authentication / Authorization Middleware → Controller → Mongoose Model → MongoDB → API Response → React Frontend**

This structure separates **routing, access control, business logic, and database operations**, making the backend easier to understand and maintain.


