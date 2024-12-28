# Backend Blog Application

---

## Description

**Backend Blog Application** is a backend service designed to provide robust and scalable RESTful APIs for [briefly describe purpose, e.g., managing users, handling authentication, etc.]. It features secure authentication, efficient data handling, and is built using modern web technologies.

---

## Features

- **Authentication and Authorization**:
   - Secure JWT-based token system.
   - Role-based access control for user management.
- **Database Integration**:
   - MongoDB for data persistence.
- **Error Handling**:
   - Centralized and detailed error logging.
- **Validation**:
   - Request validation using Zod.
- **Scalable and Modular Architecture**:
   - Designed for easy extension and maintenance.

---

## Technologies Used

### Core Technologies

- **Node.js**: Runtime for building scalable backend applications.
- **Express.js**: Web framework for building RESTful APIs.
- **MongoDB**: NoSQL database for efficient data storage.
- **Mongoose**: Mongoose for ODM of MongoDB.
- **TypeScript**: Adds static typing to enhance code reliability.

### Additional Libraries & Tools

- **JWT (jsonwebtoken)**: Secure token-based authentication.
- **Dotenv**: Managing environment variables.
- **Nodemon**: Development server with auto-reloading.
- **Zod**: Schema validation for inputs.

---

## Installation & Setup

### Prerequisites

Ensure the following are installed:

- **Node.js** (v18 or higher)
- **MongoDB**
- **Git**

### Steps to Set Up Locally

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/shahriarhacks/L2-ASG-3.git
   cd L2-ASG-3
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   Create a `.env` file in the root directory and add:

   ```env
    NODE_ENV=development
    PORT=2257
    MONGO_URI=mongo_uri
    BCRYPT_SALT=11
    JWT_ACCESS_SECRET=secret
    JWT_REFRESH_SECRET=secret
    JWT_ACCESS_EXPIRATION=540m
    JWT_REFRESH_EXPIRATION=90d
   ```

4. **Run the Application**:
   Start the development server:

   ```bash
   npm run dev
   <-- or -->
   npm run dev:nodemon
   ```

5. **Test the API**:
   Use tools like **Postman** to test endpoints at `http://localhost:2257`.

---

## API Documentation

---

## Models

**User Model:**

- `name`: string – The full name of the user.
- `email`: string – The email address of the user, used for authentication and communication.
- `password`: string – The password for the user, securely stored.
- `role`: "admin" | "user" – The role of the user, determining their access level. Default is "user".
- `isBlocked`: boolean – A flag indicating whether the user is blocked or not. Default is false.
- `createdAt`: Date – The timestamp when the user was created.
- `updatedAt`: Date – The timestamp of the last update to the user.

**Blog Model:**

- `title`: string – The title of the blog post.
- `content`: string – The main body or content of the blog post.
- `author`: ObjectId – A reference to the `User` model, indicating the author of the blog post.
- `isPublished`: boolean – A flag indicating whether the blog post is published. Default is true (published).
- `createdAt`: Date – The timestamp when the blog post was created.
- `updatedAt`: Date – The timestamp of the last update to the blog post.

##

## API Endpoints

### 1\. Authentication

#### 1.1 Register User

**POST** `/api/auth/register`

**Description:** Registers a new user with the platform. It validates user data and saves it to the database.

**Request Body:**

```json
{
   "name": "John Doe",
   "email": "john@example.com",
   "password": "securepassword"
}
```

**Response:**

- **Success (201):**

```json
{
   "success": true,
   "message": "User registered successfully",
   "statusCode": 201,
   "data": {
      "_id": "string",
      "name": "string",
      "email": "string"
   }
}
```

- **Failure (400):**

```json
{
  "success": false,
  "message": "Validation error",
  "statusCode": 400,
  "error": { "details" },
  "stack": "error stack"
}
```

####

#### 1.2 Login User

**POST** `/api/auth/login`

**Description:** Authenticates a user with their email and password and generates a JWT token.

**Request Body:**

```json
{
   "email": "john@example.com",
   "password": "securepassword"
}
```

**Response:**

- **Success (200):**

```json
{
   "success": true,
   "message": "Login successful",
   "statusCode": 200,
   "data": {
      "token": "string"
   }
}
```

- **Failure (401):**

```json
{
  "success": false,
  "message": "Invalid credentials",
  "statusCode": 401,
  "error": { "details" },
  "stack": "error stack"
}
```

###

### 2\. Blog Management

#### 2.1 Create Blog

**POST** `/api/blogs`

**Description:** Allows a logged-in user to create a blog by providing a title and content.

**Request Header:**`Authorization: Bearer <token>`

**Request Body:**

```json
{
   "title": "My First Blog",
   "content": "This is the content of my blog."
}
```

**Response:**

- **Success (201):**

```json
{
  "success": true,
  "message": "Blog created successfully",
  "statusCode": 201,
  "data": {
    "_id": "string",
    "title": "string",
    "content": "string",
    "author": { "details" }
  }
}
```

####

#### 2.2 Update Blog

**PATCH** `/api/blogs/:id`

**Description:** Allows a logged-in user to update their own blog by its ID.

**Request Header:**`Authorization: Bearer <token>`

**Request Body:**

```json
{
   "title": "Updated Blog Title",
   "content": "Updated content."
}
```

**Response:**

- **Success (200):**

```json
{
  "success": true,
  "message": "Blog updated successfully",
  "statusCode": 200,
  "data": {
    "_id": "string",
    "title": "string",
    "content": "string",
    "author": { "details" }
  }
}
```

####

#### 2.3 Delete Blog

**DELETE** `/api/blogs/:id`

**Description:** Allows a logged-in user to delete their own blog by its ID.

**Request Header:**`Authorization: Bearer <token>`

**Response:**

- **Success (200):**

```json
{
   "success": true,
   "message": "Blog deleted successfully",
   "statusCode": 200
}
```

####

#### 2.4 Get All Blogs (Public)

**GET** `/api/blogs`

**Description:** Provides a public API to fetch all blogs with options for searching, sorting, and filtering.

**Query Parameters**:

- `search`: Search blogs by title or content (e.g., `search=blogtitle`).
- `sortBy`: Sort blogs by specific fields such as `createdAt` or `title` (e.g., `sortBy=title`).
- `sortOrder`: Defines the sorting order. Accepts values `asc` (ascending) or `desc` (descending). (e.g., `sortOrder=desc`).
- `author`: Filter blogs by author ID (e.g., `filter=authorId`).

**Example Request URL**:

```sql
/api/blogs?search=technology&sortBy=createdAt&sortOrder=desc&author=60b8f42f9c2a3c9b7cbd4f18
```

In this example:

- `search=technology`: Filters blogs containing the term "technology" in the title or content.
- `sortBy=createdAt`: Sorts the blogs by the `createdAt` field.
- `sortOrder=desc`: Sorts in descending order (newest blogs first).
- `author=60b8f42f9c2a3c9b7cbd4f18`: Filters blogs authored by the user with the given `authorId`.

**Response:**

- **Success (200):**

```json
{
  "success": true,
  "message": "Blogs fetched successfully",
  "statusCode": 200,
  "data": [
    {
      "_id": "string",
      "title": "string",
      "content": "string",
      "author": { "details" }
    }
  ]
}
```

###

### 3\. Admin Actions

#### 3.1 Block User

**PATCH** `/api/admin/users/:userId/block`

**Description:** Allows an admin to block a user by updating the `isBlocked` property to `true`.

**Request Header:**`Authorization: Bearer <admin_token>`

**Response:**

- **Success (200):**

```json
{
   "success": true,
   "message": "User blocked successfully",
   "statusCode": 200
}
```

####

#### 3.2 Delete Blog

**DELETE** `/api/admin/blogs/:id`

**Description:** Allows an admin to delete any blog by its ID.

**Request Header:**`Authorization: Bearer <admin_token>`

**Response:**

- **Success (200):**

```json
{
   "success": true,
   "message": "Blog deleted successfully",
   "statusCode": 200
}
```

---

### Error Handling

Error handling is crucial in ensuring that an application responds gracefully to unexpected situations, providing users with meaningful feedback while maintaining system stability. A well-structured error response format helps in identifying and diagnosing issues effectively.

#### Common Error Response Format

To maintain consistency across all API endpoints, the following error response structure will be used:

```json
{
   "success": false,
   "message": "Error message describing the issue",
   "statusCode": 400, // or other relevant HTTP status code
   "error": { "details": "Additional error details, if applicable" },
   "stack": "error stack trace, if available"
}
```

#### Types of Errors Handled

The following common errors will be managed with appropriate responses:

- **Zod Validation Error** (`ZOD_ERROR`): Errors arising from invalid data inputs based on Zod schema validation.
- **Not Found Error** (`NOT_FOUND_ERROR`): When requested resources (e.g., a user, item, or page) are not found.
- **Validation Error** (`VALIDATION_ERROR`): General validation errors (e.g., incorrect data format, missing required fields).
- **Authentication Error** (`JSON_WEB_TOKEN_ERROR`): Issues related to failed authentication (e.g., invalid token or expired session).
- **Authorization Error** (`AUTHORIZATION_ERROR`): When the user lacks the necessary permissions to access a resource.
- **Internal Server Error** (`INTERNAL_SERVER_ERROR`): Unhandled errors or unexpected server issues.

By consistently implementing these error handling mechanisms, we ensure a smooth user experience and easier debugging for developers.

## Deployment

**Deploy on Vercel**

- **Live Link**: [Blogable](https://blogables.vercel.app/)

---

## Contact

For inquiries or support, contact:

- **Email**: shahriarhacks@gmail.com
- **GitHub**: [Shahriar Ahmed](https://github.com/shahriarhacks)
- **LinkedIn**: [Shahriar Ahmed](https://linkedin.com/in/shahriarhacks)

---

Thank you for using **Backend Blog Application**! We appreciate your feedback and suggestions.
