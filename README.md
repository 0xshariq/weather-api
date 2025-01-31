# Weather API Documentation

## Overview
This Weather API provides current weather and forecast data, along with user management features. The API requires authentication via an API key for weather data and uses cookie-based authentication for user management.

## Base URL
```
https://weather-api-7qxy.onrender.com/api/v2
```
Replace `weather-api-7qxy.onrender.com` with the actual domain where your API is hosted.

## Authentication

### User Authentication
- Users must register and log in to receive an authentication cookie.
- The authentication cookie is required for user management operations.

### API Key Authentication
- Weather data endpoints require an API key.
- The API key should be included in the request header or as a query parameter.

Example:
```
Header: x-api-key: YOUR_API_KEY
Query: ?key=YOUR_API_KEY
```

## Endpoints

### User Management

#### Register a New User
**POST** `/users/register`

**Request Body:**
```json
{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepassword"
}
```

**Success Response:**
- **Code:** 201
- **Content:** `{ "message": "User registered successfully" }`

#### Login
**POST** `/users/login`

**Request Body:**
```json
{
    "email": "john@example.com",
    "password": "securepassword"
}
```

**Success Response:**
- **Code:** 200
- **Content:** `{ "message": "Login successful" }`

#### Logout
**GET** `/users/logout`

**Success Response:**
- **Code:** 200
- **Content:** `{ "message": "Logout successful" }`

### Weather Data

#### Get Current Weather
**GET** `/current`

**Query Parameters:**
- `city` (required): Name of the city
- `key` (required if not in header): Your API key

**Success Response:**
- **Code:** 200
- **Content:** JSON object with current weather data

#### Get Weather Forecast
**GET** `/forecast`

**Query Parameters:**
- `city` (required): Name of the city
- `days` (optional): Number of days for forecast (default: 5)
- `key` (required if not in header): Your API key

**Success Response:**
- **Code:** 200
- **Content:** JSON object with weather forecast data

## Example Usage
To get the current weather for London:
```
curl -X GET "https://weather-api-7qxy.onrender.com/api/v2/current?city=London&key=YOUR_API_KEY"
```

To register a new user:
```
curl -X POST "https://weather-api-7qxy.onrender.com/api/v2/users/register" \
     -H "Content-Type: application/json" \
     -d '{"name": "John Doe", "email": "john@example.com", "password": "securepassword"}'
```

## License
This API is provided as-is without any warranty. Usage is subject to applicable terms and conditions.

