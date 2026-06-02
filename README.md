# Postify - React Native CRUD App

A mobile application built with React Native and Expo that performs CRUD operations on posts using the JSONPlaceholder API.

## Features

### Core Functionality
- **Display Posts**: Fetches and displays posts from JSONPlaceholder API with title and body
- **Create Post**: Form to create new posts with title and body fields
- **Update Post**: Edit existing posts with pre-filled form data
- **Delete Post**: Delete posts with confirmation dialog
- **Loading States**: Shows loading spinner while fetching data
- **Error Handling**: Displays user-friendly error messages
- **Success Feedback**: Shows success notifications for CRUD operations

### Additional Features
- **Search/Filter**: Real-time search functionality to filter posts by title or body
- **Pagination**: Load more button to paginate through posts (10 posts per page)
- **State Management**: Context API for global state management
- **TypeScript**: Fully typed codebase for better developer experience

## Tech Stack

- **React Native** - Mobile framework
- **Expo** - Development platform
- **TypeScript** - Type safety
- **React Navigation** - Screen navigation
- **Context API** - State management
- **JSONPlaceholder API** - Mock REST API

## Project Structure

```
postify2/
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── PostCard.tsx
│   │   └── FeedbackBanner.tsx
│   ├── context/           # Context API state management
│   │   └── PostContext.tsx
│   ├── screens/           # App screens
│   │   ├── HomeScreen.tsx
│   │   ├── CreatePostScreen.tsx
│   │   └── EditPostScreen.tsx
│   ├── services/          # API service layer
│   │   └── api.ts
│   └── types/             # TypeScript type definitions
│       └── index.ts
├── App.tsx                # Root component with navigation setup
└── package.json
```

## Installation & Setup

1. Clone the repository:
```bash
git clone https://github.com/Xomo-rgb/postify_app.git
cd postify_app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npx expo start
```

4. Run on your device:
   - Scan the QR code with Expo Go app (Android/iOS)
   - Or press `a` to open on Android emulator
   - Or press `i` to open on iOS simulator

## API Endpoints Used

- `GET /posts` - Fetch all posts
- `POST /posts` - Create a new post
- `PUT /posts/:id` - Update an existing post
- `DELETE /posts/:id` - Delete a post

## Screenshots

(Add screenshots here if needed)

## Notes

- This app was built as part of a technical assessment for a Mobile Developer role
- Uses JSONPlaceholder API which simulates API responses (new posts won't persist)
- Follows React Native best practices with functional components and hooks
