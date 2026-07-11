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

## API Endpoints

Vista's backend exposes REST APIs for **authentication, property listings, reviews, and reservations**. Protected routes use authentication middleware to verify the current user session.

### User Authentication

| Method | Endpoint  | Description                               |
| ------ | --------- | ----------------------------------------- |
| POST   | `/signup` | Register a new user                       |
| POST   | `/login`  | Authenticate and log in a user            |
| GET    | `/logout` | Log out the current user                  |
| GET    | `/me`     | Retrieve the currently authenticated user |

### Property Listings

| Method | Endpoint              | Description                                   |
| ------ | --------------------- | --------------------------------------------- |
| GET    | `/listing/all`        | Retrieve all property listings                |
| GET    | `/listing/user`       | Retrieve listings owned by the logged-in user |
| GET    | `/listing/:id`        | Retrieve a specific property listing          |
| POST   | `/listing/create`     | Create a new property listing                 |
| PUT    | `/listing/update`     | Update an existing property listing           |
| DELETE | `/listing/delete/:id` | Delete a property listing                     |

### Reviews

| Method | Endpoint                         | Description                             |
| ------ | -------------------------------- | --------------------------------------- |
| POST   | `/listing/:id/review`            | Add a review to a property listing      |
| DELETE | `/listing/:id/reviews/:reviewId` | Delete a review from a property listing |

### Reservations

| Method | Endpoint                       | Description                                          |
| ------ | ------------------------------ | ---------------------------------------------------- |
| POST   | `/reservation/create`          | Create a new property reservation                    |
| GET    | `/reservation/all`             | Retrieve all reservations                            |
| GET    | `/reservation/my-trips`        | Retrieve reservations of the logged-in user          |
| GET    | `/reservation/user`            | Retrieve reservations related to the current user    |
| GET    | `/reservation/host/:listingId` | Retrieve reservations for a specific hosted property |
| PATCH  | `/reservation/:id/cancel`      | Cancel an existing reservation                       |
| GET    | `/reservation/:listingId`      | Retrieve booked dates for a specific property        |

Routes that perform **user-specific or restricted operations** use the `isLoggedIn` middleware to verify the authenticated session before executing the controller logic.

## Reservation Cancellation and Status Management

Vista allows users to cancel an existing reservation through the reservation management system. Instead of deleting the reservation record, the application updates the reservation using a dedicated cancellation endpoint.

The cancellation request is handled through the **PATCH /reservation/:id/cancel** route. The backend identifies the reservation using its ID and updates its current status, allowing the application to preserve the reservation record while marking it as cancelled.

Keeping cancelled reservations in the database helps preserve booking history and reservation information instead of permanently removing the record.

## Listing Deletion and Related Reservation Cleanup

Vista maintains **data consistency between property listings and reservations** when a property is removed from the platform. Since reservation documents contain a reference to their related listing, deleting only the listing could leave reservation records pointing to a property that no longer exists.

To prevent these invalid references, Vista removes **all reservations associated with a listing when that listing is deleted**. This ensures that sections such as **My Trips** do not attempt to retrieve or display information from a deleted property.

The cleanup process can be summarized as:

**Delete Listing Request → Verify Listing Ownership → Find Related Reservations → Delete Associated Reservations → Delete Listing → Update Application Data**

This approach prevents **orphaned reservation records** and keeps the relationships between listings and reservations consistent.

## Frontend Reservation Date Handling

Vista uses **MUI Date Pickers and Day.js** to manage reservation dates on the frontend. Users select their **check-in and check-out dates** through the reservation interface, while existing booked dates are retrieved from the backend for the selected property.

The booked date information is used to restrict unavailable dates in the calendar and prevent users from selecting already reserved periods. After a successful reservation, the frontend retrieves the updated booked dates again so that the calendar reflects the latest property availability without requiring a full page refresh.

Day.js is also used to manage date values and calculate the selected stay duration for reservation-related price information.

The frontend date flow can be summarized as:

**Load Property → Fetch Booked Dates → Display Reservation Calendar → Select Dates → Create Reservation → Refresh Booked Dates → Update Calendar Availability**

## Error Handling and Protected Requests
Vista handles protected operations through **authentication middleware and HTTP response status codes**. When an unauthenticated user attempts to access a protected backend route, the server returns an **unauthorized (`401`) response**.

The React frontend checks these responses and displays appropriate user feedback, such as prompting the user to log in before creating a listing or performing other restricted actions. Authenticated API requests use **`withCredentials: true`** so that the browser can include the active session cookie.

The application also uses backend validation and error responses to prevent invalid operations such as **overlapping reservations, unauthorized listing management, and restricted user actions**.

This approach allows the frontend and backend to work together to provide clear feedback while keeping protected operations controlled by the server.

## Deployment Architecture

Vista's **frontend and backend are deployed separately on Render**. The React frontend communicates with the deployed Express backend through REST API requests.

The application uses **MongoDB Atlas** as its cloud-hosted database for storing users, listings, reviews, reservations, and session data. **Cloudinary** is used to host property images, while the corresponding image URLs are stored with listing data in MongoDB.

The deployment architecture can be summarized as:

**React Frontend (Render) → Express Backend (Render) → MongoDB Atlas**

**Cloudinary → Property Image Hosting**

Because the backend uses Render's current hosting configuration, the service may become inactive after a period of inactivity. The **first request may take one or two minutes while the backend becomes active again**, after which subsequent requests generally respond normally.

## Technical Challenges and Solutions

During the development of Vista, several technical challenges were encountered while integrating the frontend, backend, database, and deployment environment.

### Cross-Origin Session Authentication

Since the frontend and backend are deployed on separate origins, maintaining Passport.js sessions required correct **CORS, cookie, and credential configuration**. Axios requests use **`withCredentials: true`**, while the backend allows credential-based requests from the frontend origin.

### Session Persistence

Storing sessions only in backend memory is not suitable for a deployed application. Vista uses **Connect Mongo** to store Express Session data in MongoDB, allowing authenticated sessions to persist independently of the backend server's memory.

### Reservation Date Conflicts

The reservation system requires preventing multiple users from booking the same property for overlapping dates. Vista compares the requested date range with existing reservations and rejects bookings when an overlap is detected.

### Reservation Calendar Updates

After creating a reservation, the booked dates must immediately appear unavailable in the frontend calendar. The frontend retrieves the updated reservation dates after a successful booking and refreshes the calendar availability.

### Deleted Listing References

Deleting a listing while keeping its reservations created invalid listing references and caused issues in **My Trips**. Vista resolves this by deleting reservations associated with the property when the listing itself is removed.

### Date and Time Handling

Reservation dates required consistent handling between the frontend, backend, and MongoDB. **Day.js and JavaScript date values** are used to manage selected dates and reservation calculations across the application.

These challenges provided practical experience in debugging **full-stack integration, authentication, database relationships, reservation logic, and deployed application behavior**.


## Technical Summary

Vista demonstrates the development of a complete **MERN stack application** with a separate frontend and backend architecture. The project combines **session-based authentication, ownership-based authorization, MongoDB relationships, REST APIs, property management, reviews, and reservation workflows** within a single application.

The reservation system introduces practical application logic such as **date availability checks, overlapping booking prevention, dynamic price calculation, reservation cancellation, and user-specific booking management**. The application also handles data relationships between users, listings, reviews, and reservations while maintaining consistency when related resources are modified or deleted.

Through its development and deployment, Vista demonstrates practical experience with **React, Node.js, Express.js, MongoDB, Mongoose, Passport.js, session management, cross-origin authentication, cloud services, and full-stack debugging**.

