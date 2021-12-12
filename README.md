# Authentication & Authorization

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

# CRUD

- Create /api/products (POST)

  - Create Product Model( name*, price*, size*, image*)
  - using 'multer' for multipart data
  - files will be uploaded to folder named 'uploads'
  - fs (link, unlink) for handdling files

- Read
  => get All

  - for large use pagination ( mongoose-pagination)
  - to get in some order, .sort({\_id: -1})
    `sorts on descending order of id` \** Current all images don't have complete paths with server
    -> updating image attribute of ProductSchema of Product Model, and and one more property besides *timestamps\*
    ``` image: { type: String, required: true, get: (image)=>{ return`{APP_URL}/${image}`;
    }}

              .
              .
              .
              {timestamps: true, *toJSON: {getters:true}*}
            ```
        -> update env
            ```
            APP_URL = http://localhost:5000
            ```
        -> Create upload api (to serve static file)
            ```
              app.use('/uploads', express.static('uploads'))
            ```

  => get Single
  \*\* As id is duplicate in response , update ProductSchema, Add one more property besides _timestamps_
  `{timestamps: true, toJSON: {getters:true}, *id:false*}`

- Update /api/products/<product_id> (PUT)

  - only authenticated admin can update , creating middleware for same
  - .findOneAndUpdate({}, {}, {})

- Delete /api/producst/<product\*id> (DELETE)
  - only authenticated admin can delete
  - .findOneAndRemove({})
  - const imagePath = document.\*\_doc\_.image;
