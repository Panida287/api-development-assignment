# api-development-assignment

# RESTful API with Authentication

This is a RESTful API that provides functionality for managing movies, directors, and categories with secure authentication using JWT. It is deployed at **[api.panidapaethanom.com](https://api.panidapaethanom.com)**.

## Features

- User authentication (Sign Up, Login, Logout, Token Refresh)
- JWT-based token security
- CRUD operations for movies, directors, and categories
- Filtering and limitation

---

# API Documentation
## Base URL :
https://api.panidapaethanom.com

## Endpoints

### Authentication
- Sign up
  - `GET`/auth/signup
  - Body:
    ```json
    {
      "username": "exampleUser", //required
      "password": "examplePassword" //required
    }
    
  - Response:
    ```json
    {
      "message": "User successfully signed up",
      "username": "exampleUser"
    }
    
- Login
  - `POST` /auth/login
  - Body:
    ```json
    {
      "username": "exampleUser", //required
      "password": "examplePassword" //required
    }
    
  - Response:
    ```json
    {
    "accessToken": "yourAccessToken",
    "refreshToken": "yourRefreshToken"
    }
      
- Logout
  - `DELETE` /auth/logout
  - Body:
    ```json
    {
    "token": "yourRefreshToken"
    }
    
  - Response:
    ```json
    HTTP/1.1 204 No Content

- Refresh Token
  - `POST` /auth/refresh
  - Body:
    ```json
    {
    "token": "yourRefreshToken"
    }

  - Response:
    ```json
    {
    "accessToken": "newAccessToken"
    }

### Movies
- Get All Movies
  - `GET` /movies
  - Headers:
    ```plaintext
    Authorization: Bearer <accessToken>

  - Query Parameters (optional):
    - Director <string> : Filter by director name
    - category <string> : Filter by category name
    - limit <number> : Limit the number of results
    
      - Response
        ```json
        [
          {
          "title": "Example Movie",
          "year": 2023,
          "director": {
            "name": "Example Director",
            "gender": "female"
          },
          "category": {
            "category_name": "Drama"
            }
          }
        ]
