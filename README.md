# Node.js CRUD API with MongoDB and Swagger

This project is a **CRUD (Create, Read, Update, Delete)** API built with **Node.js**, **Express.js**, **MongoDB** using **Mongoose**, and integrated with **Swagger** for API documentation and testing.

## Features

- **Node.js & Express** for routing and server handling.
- **MongoDB** as the database, using **Mongoose** to interact with MongoDB collections.
- **Swagger UI** for testing and documenting the API endpoints.
- Full CRUD operations (Create, Read, Update, Delete) for managing user data.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (https://nodejs.org/)
- **MongoDB** (https://www.mongodb.com/try/download/community)

## Getting Started

### Step 1: Clone the repository

```
git clone <repository-url>
```
```
cd <repository-directory>
```


### Step 2: Clone the repository

Run the following command to install all required Node.js packages:
```
npm install
```

### Step 3: Create a package.json file (if not already done)

If you don’t have a package.json file, you can create one using:

```
npm init -y
```

This will create a basic package.json file in your project.

### Step 4: Start MongoDB
If MongoDB is not installed as a service on your machine, you’ll need to start the MongoDB server manually:

```
mongod
```

MongoDB will start, listening on the default port 27017.

**Note: If you have MongoDB installed as a service, it will start automatically.**

### Step 5: Start the Node.js Server

Run the following command to start the Node.js server:
```
node app.js
```

Once the server starts, you’ll see the following logs:
```
MongoDB connected
Server running on http://localhost:3000
Swagger Docs available at http://localhost:3000/api-docs
```


### Step 6: Test API Endpoints with Swagger
This project integrates Swagger for API testing. Swagger automatically generates interactive API documentation where you can test the API directly from your browser.
To access the Swagger UI:

Open your browser and navigate to:
```
http://localhost:3000/api-docs
```

From here, you can interact with the API:

- GET all users
- GET a user by ID
- POST a new user
- PUT (update) a user's name
- DELETE a user by ID

### Step 7: API Endpoints
| HTTP Method | Endpoint         | Description              | Example Response                           |
| ----------- | ---------------- | ------------------------ | ------------------------------------------ |
| GET         | `/users`          | Retrieve all users       | `[ { "id": "1", "name": "John" } ]`        |
| GET         | `/users/{id}`     | Get a user by ID         | `{ "id": "1", "name": "John" }`            |
| POST        | `/users`          | Create a new user        | `{ "id": "2", "name": "Jane" }`            |
| PUT         | `/users/{id}`     | Update a user by ID      | `{ "id": "2", "name": "Jane Doe" }`        |
| DELETE      | `/users/{id}`     | Delete a user by ID      | `User deleted`                             |


### Examples
- **GET all users**: `http://localhost:3000/users`
- **GET a user by ID**: `http://localhost:3000/users/1`
- **POST a new user**: `http://localhost:3000/users` with JSON body `{
    "name": "Jane"
    }`
- **PUT (update) a user's name**: `http://localhost:3000/users/
- **DELETE a user by ID**: `http://localhost:3000/users/1`

