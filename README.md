# api-development-assignment

# RESTful API with Authentication

This is a RESTful API that provides functionality for managing movies, directors, and categories with secure authentication using JWT. It is deployed at **[api-development-assignment-git-main-panida-paethanoms-projects.vercel.app](https://api-development-assignment-git-main-panida-paethanoms-projects.vercel.app/)**.

# Deployed website for example usage
[https://api-development-frontend-blond.vercel.app/](https://api-development-frontend-blond.vercel.app/)
- User may register via /auth/register/
- User may login via /auth/login/
- User may view movies without logging in
- User may filter movies through director's name and category
- User may create movie by being logged in



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
    - 
  - [Categories](#Categories)
    - _Categories_ `BASE_URL`/categories

## Usage
- [Authentication](#Authentication)
- [Movies](#Movies)
- [Categories](#Categories)
- [Directors](#Directors)

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
    "username": "yourusername"
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
  - _No authentication needed_

      - Query Parameters (optional):
        - Prop: `director` Type: `String` Usage: Filter by director name
        - Prop: `category` Type: `String` Usage: Filter by category
        - Prop: `limit` Type: `Integer` Usage: Limit number of results
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
      },
      "category": {
        "category_name": "Drama"
        }
      }
    ]
  
---
- Get Movie by ID
    - `GET` /movies/&lt;id>
      - _No authentication needed_

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
  - _No authentication needed_

    - Response

    ```json
    {
    "_id": "Director id",
    "name": "Director name",
    }
    
  ---

### Category
- Get All Categories
  - `GET` /categories
  - _No authentication needed_

    - Response

    ```json
    {
    "_id": "Category id",
    "category_name": "Category name",
    }
