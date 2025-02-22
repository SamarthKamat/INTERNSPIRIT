# Carpooling and Ride-Sharing Web Application

This project is a carpooling and ride-sharing web application developed as part of an assignment to test the ability to research, design, implement, and report on relevant technologies related to Web Development for Information Systems. The project was implemented using the MERN (MongoDB, Express.js, React.js, Node.js) stack, excluding MongoDB and Angular, with the flexibility of using React Bootstrap and other libraries to enhance user experience.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- [Project Structure](#project-structure)
- [Research and Planning](#research-and-planning)
- [Choice of Framework and Technologies](#choice-of-framework-and-technologies)
- [Consumption of Web Services](#consumption-of-web-services)
- [Security Measures](#security-measures)
- [User Authentication and Authorization](#user-authentication-and-authorization)
- [Responsive Design](#responsive-design)
- [Contributors](#contributors)

## Introduction

The Carpooling and Ride-Sharing Web Application aims to provide a platform for users to share rides, reducing travel costs and environmental impact. Users can register, log in, search for available rides, and view details on a user-friendly interface. Admin users can log in to access additional functionalities, such as viewing application statistics.

## Features

- User registration and login
- Search for rides based on location
- View ride details
- Admin dashboard with login authentication
- Admin mode share market statistics for the web application
- Responsive design for various devices

## Technologies Used

- **Frontend:** React.js, React Bootstrap, Styled Components
- **Backend:** Node.js, Express.js
- **Deployment:** On Azure
- **Others:** Chart.js for data visualization

## Setup and Installation

### Prerequisites

- Node.js installed in the system
- Dependencies isntalled in both the frontend and backend folders using npm install before running the application

### Installation

1. Clone the repository:

   ```bash
   https://github.com/ArbazKM/Car-pooling-Web-Application.git





API documentation for the carpooling app, including the paths, use cases, input, and output.

### Authentication API

#### Register User
- **Path:** `/api/auth/register`
- **Use:** Register a new user
- **Input:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepassword",
    "phone": "123-456-7890",
    "bio": "I love carpooling!"
  }
  ```
- **Output:**
  ```json
  {
    "token": "jwt_token_here",
    "user": {
      "_id": "user_id_here",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "123-456-7890",
      "bio": "I love carpooling!",
      "rides": [],
      "rating": 0
    }
  }
  ```

#### Login User
- **Path:** `/api/auth/login`
- **Use:** Log in an existing user
- **Input:**
  ```json
  {
    "email": "john@example.com",
    "password": "securepassword"
  }
  ```
- **Output:**
  ```json
  {
    "token": "jwt_token_here",
    "user": {
      "_id": "user_id_here",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "123-456-7890",
      "bio": "I love carpooling!",
      "rides": [],
      "rating": 0
    }
  }
  ```

### User API

#### Get User Profile
- **Path:** `/api/users/profile`
- **Use:** Get logged-in user's profile
- **Input:** (Requires authentication token)
- **Output:**
  ```json
  {
    "_id": "user_id_here",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "123-456-7890",
    "bio": "I love carpooling!",
    "rides": [],
    "rating": 0
  }
  ```

#### Update User Profile
- **Path:** `/api/users/profile`
- **Use:** Update logged-in user's profile
- **Input:**
  ```json
  {
    "name": "John Doe",
    "phone": "123-456-7890",
    "bio": "I love carpooling even more!"
  }
  ```
- **Output:**
  ```json
  {
    "_id": "user_id_here",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "123-456-7890",
    "bio": "I love carpooling even more!",
    "rides": [],
    "rating": 0
  }
  ```

### Ride API

#### Create Ride
- **Path:** `/api/rides/create`
- **Use:** Create a new ride
- **Input:**
  ```json
  {
    "startLocation": "Point A",
    "endLocation": "Point B",
    "startTime": "2025-02-25T09:00:00.000Z",
    "price": 10,
    "carId": "car_id_here"
  }
  ```
- **Output:**
  ```json
  {
    "_id": "ride_id_here",
    "driver": "user_id_here",
    "car": "car_id_here",
    "startLocation": "Point A",
    "endLocation": "Point B",
    "startTime": "2025-02-25T09:00:00.000Z",
    "price": 10,
    "passengers": [],
    "status": "Scheduled",
    "feedback": []
  }
  ```

#### Get User Rides
- **Path:** `/api/rides/myrides`
- **Use:** Get rides of the logged-in user
- **Input:** (Requires authentication token)
- **Output:**
  ```json
  [
    {
      "_id": "ride_id_here",
      "driver": "user_id_here",
      "car": "car_id_here",
      "startLocation": "Point A",
      "endLocation": "Point B",
      "startTime": "2025-02-25T09:00:00.000Z",
      "price": 10,
      "passengers": [],
      "status": "Scheduled",
      "feedback": []
    }
  ]
  ```

### Car API

#### Add Car
- **Path:** `/api/cars/add`
- **Use:** Add a new car for the logged-in user
- **Input:**
  ```json
  {
    "make": "Toyota",
    "model": "Corolla",
    "year": 2020,
    "licensePlate": "XYZ-123"
  }
  ```
- **Output:**
  ```json
  {
    "_id": "car_id_here",
    "make": "Toyota",
    "model": "Corolla",
    "year": 2020,
    "licensePlate": "XYZ-123",
    "owner": "user_id_here"
  }
  ```

#### Get Logged-in User's Cars
- **Path:** `/api/cars/mycars`
- **Use:** Get cars of the logged-in user
- **Input:** (Requires authentication token)
- **Output:**
  ```json
  [
    {
      "_id": "car_id_here",
      "make": "Toyota",
      "model": "Corolla",
      "year": 2020,
      "licensePlate": "XYZ-123",
      "owner": "user_id_here"
    }
  ]
  ```

#### Get Cars by User ID
- **Path:** `/api/cars/user/:userId/cars`
- **Use:** Get cars of any user by their user ID (requires appropriate permissions)
- **Input:** (Requires authentication token)
- **Output:**
  ```json
  [
    {
      "_id": "car_id_here",
      "make": "Toyota",
      "model": "Corolla",
      "year": 2020,
      "licensePlate": "XYZ-123",
      "owner": "user_id_here"
    }
  ]
  ```

### Feedback API

#### Submit Feedback
- **Path:** `/api/feedback/submit`
- **Use:** Submit feedback for a ride
- **Input:**
  ```json
  {
    "rideId": "ride_id_here",
    "receiverId": "user_id_here",
    "rating": 5,
    "comment": "Great ride!"
  }
  ```
- **Output:**
  ```json
  {
    "_id": "feedback_id_here",
    "ride": "ride_id_here",
    "giver": "user_id_here",
    "receiver": "user_id_here",
    "rating": 5,
    "comment": "Great ride!",
    "createdAt": "2025-02-22T12:57:00.000Z"
  }
  ```

#### Get Feedback for a Ride
- **Path:** `/api/feedback/ride/:rideId`
- **Use:** Get feedback for a specific ride
- **Input:** (Requires authentication token)
- **Output:**
  ```json
  [
    {
      "_id": "feedback_id_here",
      "ride": "ride_id_here",
      "giver": "user_id_here",
      "receiver": "user_id_here",
      "rating": 5,
      "comment": "Great ride!",
      "createdAt": "2025-02-22T12:57:00.000Z"
    }
  ]
  ```

### Booking API (continued)

#### Cancel Ride Request
- **Path:** `/api/bookings/cancel`
- **Use:** Cancel a ride request
- **Input:**
  ```json
  {
    "bookingId": "booking_id_here"
  }
  ```
- **Output:**
  ```json
  {
    "message": "Ride request canceled",
    "booking": {
      "_id": "booking_id_here",
      "ride": "ride_id_here",
      "passenger": "user_id_here",
      "driver": "user_id_here",
      "pickupLocation": "User Pickup Location",
      "status": "Rejected",
      "createdAt": "2025-02-22T12:57:00.000Z"
    }
  }
  ```

### Ride Search API

#### Search Rides
- **Path:** `/api/rides/search`
- **Use:** Search for available rides to a destination or on the way to a destination
- **Input:**
  ```json
  {
    "startLocation": "Point A",
    "endLocation": "Point B"
  }
  ```
- **Output:**
  ```json
  [
    {
      "_id": "ride_id_here",
      "driver": {
        "_id": "user_id_here",
        "name": "John Doe",
        "email": "john@example.com",
        "phone": "123-456-7890",
        "bio": "I love carpooling!"
      },
      "car": {
        "_id": "car_id_here",
        "make": "Toyota",
        "model": "Corolla",
        "year": 2020,
        "licensePlate": "XYZ-123",
        "owner": "user_id_here"
      },
      "startLocation": "Point A",
      "endLocation": "Point B",
      "startTime": "2025-02-25T09:00:00.000Z",
      "price": 10,
      "passengers": [],
      "status": "Scheduled",
      "feedback": []
    }
  ]
  ```

### Admin API

#### Get All Users
- **Path:** `/api/admin/users`
- **Use:** Get all users (requires admin permissions)
- **Input:** (Requires authentication token with admin role)
- **Output:**
  ```json
  [
    {
      "_id": "user_id_here",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "123-456-7890",
      "bio": "I love carpooling!",
      "rides": [],
      "rating": 0
    }
  ]
  ```

#### Get All Rides
- **Path:** `/api/admin/rides`
- **Use:** Get all rides (requires admin permissions)
- **Input:** (Requires authentication token with admin role)
- **Output:**
  ```json
  [
    {
      "_id": "ride_id_here",
      "driver": {
        "_id": "user_id_here",
        "name": "John Doe",
        "email": "john@example.com",
        "phone": "123-456-7890",
        "bio": "I love carpooling!"
      },
      "car": {
        "_id": "car_id_here",
        "make": "Toyota",
        "model": "Corolla",
        "year": 2020,
        "licensePlate": "XYZ-123",
        "owner": "user_id_here"
      },
      "startLocation": "Point A",
      "endLocation": "Point B",
      "startTime": "2025-02-25T09:00:00.000Z",
      "price": 10,
      "passengers": [],
      "status": "Scheduled",
      "feedback": []
    }
  ]
  ```

