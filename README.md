# Blog-Api

Blog-Api is the backend API for the Blogi application. It is built with Express and Prisma, and provides endpoints for user authentication, managing posts, and managing comments.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Installation

To install and run the project locally, follow these steps:

1. Clone the repository: `git clone https://github.com/nickgv/blog-api.git`
2. Navigate to the project directory: `cd blog-api`
3. Install dependencies: `npm install`
4. Set up the environment variables:
   - Create a `.env` file in the root directory
   - Add the following variables to the `.env` file:
     ```plaintext
     DATABASE_URL=your-database-url
     JWT_SECRET=your-jwt-secret
     ```
5. Run the Prisma migrations: `npx prisma migrate dev`
6. Start the development server: `npm start`

## Usage

To use the API, follow these steps:

1. Start the development server: `npm start`
2. The API will be available at `http://localhost:3000`

## Features

- User authentication (sign up, log in)
- Create, read, update, and delete blog posts
- Create, read, update, and delete comments
- JWT-based authentication

## API Endpoints

### Authentication

- `POST /auth/signup`: Sign up a new user
- `POST /auth/login`: Log in an existing user

### Posts

- `GET /posts`: Get all posts
- `GET /posts/:id`: Get a single post by ID
- `POST /posts`: Create a new post (requires authentication)
- `PUT /posts/:id`: Update a post by ID (requires authentication)
- `DELETE /posts/:id`: Delete a post by ID (requires authentication)

### Comments

- `POST /comments`: Create a new comment (requires authentication)
- `GET /comments/post/:postId`: Get comments for a specific post
- `PUT /comments/:id`: Update a comment by ID (requires authentication)
- `DELETE /comments/:id`: Delete a comment by ID (requires authentication)

## Contributing

Contributions are welcome! If you find any bugs or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).