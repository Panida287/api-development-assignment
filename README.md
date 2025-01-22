# api-development-assignment

# RESTful API with Authentication

This is a RESTful API that provides functionality for managing movies, directors, and categories with secure authentication using JWT. It is deployed at **[api-development-assignment-git-main-panida-paethanoms-projects.vercel.app](https://api-development-assignment-git-main-panida-paethanoms-projects.vercel.app/)**.

# Table of Contents
- [Features](#Features)
- [API Documentation](#API-Documentation)
- [Endpoints](#Endpoints)
- [Usage](#Usage)

## Features

- User authentication (Sign Up, Login, Logout, Token Refresh)
- JWT-based token security
- CRUD operations for movies, directors, and categories
- Filtering and limitation

---

# API Documentation
## Base URL :
https://api-development-assignment-git-main-panida-paethanoms-projects.vercel.app/

## Endpoints
  - [Authentication](#Authentication)
    - _Sign up_ : `BASE_URL`/auth/signup
    - _Login_ : `BASE_URL`/auth/login
    - _Logout_ : `BASE_URL`/auth/logout
    - _Refresh token_ : `BASE_URL`/auth/refresh
  - [Movies](#Movies)
    - _movies_ `BASE_URL`/movies
    
  - [Directors](#Directors)
    - _Directors_ `BASE_URL`/directors

## Usage
- [Authentication](#Authentication)
- [Movies](#Movies)

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

      Authorization: Bearer <accessToken>

      - Query Parameters (optional):
        - Prop: `director` Type: `String` Usage: Filter by director name
        - Prop: `category` Type: `String` Usage: Filter by category
        - Prop: `limit` Type: `Number` Usage: Limit number of results
<br><br>
      _An example query filtering:_

          `GET` /movies?director=&lt;string>&category=&lt;string>&limit=&lt;number>
<br><br>
  
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
  
---
- Get Movie by ID
    - `GET` /movies/&lt;id>
    - Headers:
      ```plaintext
      Authorization: Bearer <accessToken>

    - Response
      ```json
      {
        "_id": "movie id"
        "title": "Example Movie",
        "year": 2023,
        "category": {
          "_id": "category id"
          "category_name": "Drama"
        }
        "director": {
          "_id": "director id"
          "name": "Example Director",
          "gender": "female"
        },
      }
---
- Create a movie
  - `POST` /movies
  - Headers:
    ```plaintext
    Authorization: Bearer <accessToken>
  - Body:
    ```json
    {
      "title": "Example Movie", //required
      "year": 2023, //required
      "category": "Drama" //required
      "director": {
        "name": "Example Director", //required
        "gender": "female" //required //Value must be "male" or "female"
      },
    }

  - Response
    ```json
    {
      "message": "Movie created successfully",
      "movie": {
        "title": "Example Movie",
        "year": 2023,
        "category": {
          "_id": "category id"
          "category_name": "Drama"
        }
        "director": {
          "_id": "director id"
          "name": "Example Director",
          "gender": "female"
        },
      }
    }
---
- Update a movie
  - `PUT` /movies/&lt;id>
  - Headers:
    ```plaintext
    Authorization: Bearer <accessToken>
  - Body:
    ```json
    {
      "title": "Updated Movie Title",
      "year": 2023,
      "director": {
        "name": "Updated Director",
        "gender": "male" //Value must be "male" or "female"
      },
      "category": "Comedy"
    }

  - Response
    ```json
    {
      "message": "Movie updated successfully",
      "movie": {
        "title": "Updated Movie Title",
        "year": 2023,
        "category": {
          "_id": "Category id"
          "category_name": "Comedy"
        }
        "director": {
          "_id": "Director-id"
          "name": "Updated Director",
          "gender": "male"
        },
      }
    }
---
- Delete a movie
  - `DELETE` /movies/&lt;id>
  - Headers:
    ```plaintext
    Authorization: Bearer <accessToken>

  - Response
    ```plaintext
    HTTP/1.1 204 No Content
    
---

### Directors
- Get All Directors
  - `GET` /directors
    - Headers:

      Authorization: Bearer <accessToken>

      - Query Parameters (optional):
        - Prop: `gender` Type: `String` Usage: Filter director by gender [male, female]
          <br><br>
          _An example query filtering:_

          `GET` /directors?gender=&lt;male/female>
          <br><br>

    - Response

    ```json
    {
    "_id": "Director id",
    "name": "Director name",
    "gender": "female"
    }
