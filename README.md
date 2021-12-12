# crud-node

##Steps

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
  User-> ( name, email, password, role)
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
  Autherization: Bearer XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  ```

- Generating Refresh token
  : On Registration & Login

## /api/refresh (POST)

- Creating End Point to get new access_token by sending refresh_token

  ```
  {
    "refresh_token": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXx"
  }
  ```

## /api/logout (POST)

- Create End Point to delete 'refresh_token' of user
- access_token required in header, and refresh_token in body

- Create
- Read
- Update
- Delete
