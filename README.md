# Weather API Documentation

## Overview
The Weather API provides real-time weather data and forecast information, along with user management features. Authentication is handled via API keys for weather data and cookies for user accounts.

## Base URL
```
https://weather-api-7qxy.onrender.com/api/v2
```

## Authentication

### User Authentication
User authentication is cookie-based. Users must register and log in to receive an authentication cookie.

### API Key Authentication
Weather data endpoints require an API key, which can be included in requests:
- **Header**: `x-api-key: YOUR_API_KEY`
- **Query**: `?key=YOUR_API_KEY`

## Endpoints

### User Management

#### Register a New User
- **URL**: `/users/register`
- **Method**: `POST`
- **Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}
```
- **Response**:
  - **Code**: 201
  - **Content**:
  ```json
  { "message": "User registered successfully" }
  ```

#### Login
- **URL**: `/users/login`
- **Method**: `POST`
- **Body**:
```json
{
  "email": "john@example.com",
  "password": "securepassword"
}
```
- **Response**:
  - **Code**: 200
  - **Content**:
  ```json
  { "message": "Login successful" }
  ```

#### Logout
- **URL**: `/users/logout`
- **Method**: `GET`
- **Response**:
  - **Code**: 200
  - **Content**:
  ```json
  { "message": "Logout successful" }
  ```

### Weather Data

#### Get Current Weather
- **URL**: `/current`
- **Method**: `GET`
- **Query Parameters**:
  - `city` (required): Name of the city
  - `key` (required): API key
- **Response**:
  - **Code**: 200
  - **Content**: JSON object with current weather data

#### Get Weather Forecast
- **URL**: `/forecast`
- **Method**: `GET`
- **Query Parameters**:
  - `city` (required): Name of the city
  - `days` (optional): Number of days (default: 5)
  - `key` (required): API key
- **Response**:
  - **Code**: 200
  - **Content**: JSON object with weather forecast data

## Error Handling

| Code | Description |
|------|-------------|
| 200  | OK |
| 201  | Created |
| 400  | Bad Request |
| 401  | Unauthorized |
| 403  | Forbidden |
| 404  | Not Found |
| 429  | Too Many Requests |
| 500  | Internal Server Error |

Error responses contain a JSON object with a `message` field describing the issue.

## Rate Limiting
Requests are limited to **1000 requests per week per API key**.

## CORS Support
CORS is enabled for:
- `http://localhost:3000`
- `https://weather-api-7qxy.onrender.com/`
- Additional origins defined by the `FRONTEND_URL` environment variable

## Notes
- All timestamps follow the **ISO 8601** format.
- All requests must be made over **HTTPS**.
- Keep your API key secure.
- For support, contact our team.

