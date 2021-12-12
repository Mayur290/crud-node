# crud-node

#Authentication & Authorization

## /api/register (POST)

- Registeration

  - Create Routes
    - Controllers
  - validate Request ( Joi npm package)

    ```
    {
        "name":"mayur",
        "email": "mb@gmail.com",
        "password":"878t8gshbyxu28u2",
        "repeat_password":"878t8gshbyxu28u2"
    }
    ```

- Autherize Request
- check if User exist
- create model
  User-> ( name*, email*, password\* , role(customer) )
- store in DB
- generate JWT Token ( jsonwebtoken npm package, {payload, JWT_SECRET, expiry})
- Send Response (access_token)

## /api/login (POST)

- Login
  ```
  {
    "email": "mayurbans98@gmail.com",
      "password":"Mayur123"
  }
  ```

## /api/me (Get)

- gives details of user, require access_token
- Create middleWare for Authentication

  ```
  -header
  Autherization: Bearer <access_token>
  ```

- Generating Refresh token
  : On Registration & Login

## /api/refresh (POST)

- Creating End Point to get new access_token by sending refresh_token

  ```
  {
    "refresh_token": "<refresh_token>"
  }
  ```

## /api/logout (POST)

- Create End Point to delete 'refresh_token' of user
- access_token required in header, and refresh_token in body

#CRUD

- Create
- Read
- Update
- Delete
