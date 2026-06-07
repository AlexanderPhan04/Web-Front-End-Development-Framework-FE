# Web Front-End Development Framework - Frontend

Frontend application for a simple blog system built with React, Vite, React Router, Axios, Zustand and Tailwind CSS.

## Technologies Used

- React
- Vite
- React Router DOM
- Axios
- Zustand
- React Hot Toast
- Tailwind CSS

## Features

- User login
- User register
- JWT authentication state
- Protected routes
- Logout
- View all blog posts
- Search posts
- Filter posts by category
- Pagination
- View post detail
- Create post
- Edit post
- Delete post
- Like and unlike post
- Create comment
- Delete comment
- Profile page

## Project Structure

```txt
src/
  api/
    axiosClient.js
    authApi.js
    postApi.js
    commentApi.js
  components/
    Navbar.jsx
    ProtectedRoute.jsx
    PostCard.jsx
    LoadingSpinner.jsx
    Pagination.jsx
  pages/
    HomePage.jsx
    PostDetailPage.jsx
    LoginPage.jsx
    RegisterPage.jsx
    CreatePostPage.jsx
    EditPostPage.jsx
    ProfilePage.jsx
    NotFoundPage.jsx
  store/
    authStore.js
  schemas/
  utils/
  App.jsx
  main.jsx
  index.css
```

## Installation

```bash
npm install
```

## Environment Variables

Create a `.env` file in the frontend root folder:

```env
VITE_API_URL=http://localhost:5000/api
```

## Run Development Server

```bash
npm run dev
```

The frontend will run at:

```txt
http://localhost:5173
```

## Build Project

```bash
npm run build
```

## Preview Build

```bash
npm run preview
```

## Routes

| Route | Description | Protected |
|---|---|---|
| `/` | Home page, list posts | No |
| `/posts/:id` | Post detail page | No |
| `/login` | Login page | No |
| `/register` | Register page | No |
| `/create-post` | Create post page | Yes |
| `/edit-post/:id` | Edit post page | Yes |
| `/profile` | Profile page | Yes |
| `*` | Not found page | No |

## Authentication Flow

1. User registers or logs in.
2. Backend returns a JWT token and user information.
3. Token and user are saved in `localStorage`.
4. Axios automatically attaches the token to protected API requests.
5. Protected routes check if a token exists before rendering the page.
6. Logout removes token and user from `localStorage`.

## API Connection

The frontend connects to the backend through Axios.

Base URL:

```txt
http://localhost:5000/api
```

Defined in:

```txt
src/api/axiosClient.js
```

Example protected request header:

```txt
Authorization: Bearer <token>
```

## Main Pages

### Home Page

- Display all posts
- Search posts by title/content
- Filter posts by category
- Pagination
- Open post detail

### Post Detail Page

- Display post information
- Like or unlike post
- Create comment
- Delete comment
- Edit or delete post if current user is the owner

### Create Post Page

- Create a new blog post
- Requires login

### Edit Post Page

- Update an existing post
- Requires login and ownership

### Profile Page

- Display current user information
- Display authentication token
- Link to create new post

## Notes

- Backend must be running before using the frontend.
- Do not commit `.env`.
- Use `.env.example` for environment variable documentation.
