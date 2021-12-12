# crud-node

## fields

##Steps

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
- Send Response
- Login
  ```
  {
    "email": "mayurbans98@gmail.com",
      "password":"Mayur123"
  }
  ```
- Create
- Read
- Update
- Delete
