# crud-node

## fields

##Steps

- Registeration /api/register (POST)

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
- Send Response
- Login /api/login (POST)
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

- Creating End Point to get new access_token by sending refresh_token
  /api/refresh (POST)

  ```
  {
    "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWI1ZGU3MGJlNzEyOTJkYTUxMTc1OTAiLCJyb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzkzMDg5MTIsImV4cCI6MTY3MDg2NjUxMn0.vY2lkKjJgCUe_5A8o3taUzTswZLTcxd7sWC87D0aLwI"
  }
  ```

- Create
- Read
- Update
- Delete
