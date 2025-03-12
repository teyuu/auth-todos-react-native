# Todos App

A modern, secure, and scalable mobile application built with **React Native**, **TypeScript**, **Expo**, **Firebase Authentication**, and **Firestore**. This project demonstrates my expertise in mobile development, type-safe coding, and integrating backend services. It features a complete authentication flow (login, signup, logout) and a fully functional todo list with create, read, update, and delete (CRUD)

## Features

- **User Authentication**:
    - Sign up with email, password, and name (with password confirmation)
    - Log in with email and password
    - Logout functionality
- **Todo Management**:
    - Add new todos
    - Toggle todo completion status
    - Delete todos
    - Real-time todo list synced with Firestore
- **Form Validation**:
    - Email format validation
    - Password length requirement (minimum 6 characters)
    - Matching password confirmation for signup
    - Empty field checks for todos
- **Responsive UI**:
    - Clean, mobile-friendly design with **Tailwind CSS** (via NativeWind)
- **State Management**:
    - Global auth context with **React Context API**
- **Navigation**:
    - **Expo Router** for file-based, seamless navigation
    - Protected routes based on authentication status

## Tech Stack

- **React Native**: Cross-platform mobile framework
- **Expo**: Simplified development and deployment workflow
- **TypeScript**: Static typing for robust, maintainable code
- **Firebase Authentication**: Secure backend for user management
- **Firestore**: Real-time database for todo storage
- **Tailwind CSS (NativeWind)**: Utility-first styling
- **Expo Router**: Modern navigation solution

## Project Structure

├── app/
│   ├── auth.tsx           # Authentication screen (login/signup)
│   └── (home)/index.tsx   # Home screen with todo list
├── components/
│   └── InputField.tsx     # Reusable form input component
├── context/
│   └── AuthProvider.tsx   # Global auth context and state management
├── hooks/
│   └── useAuth.ts         # Custom hook for auth access
├── services/
│   ├── authService.ts     # Firebase auth logic
│   └── todoService.ts     # Firestore CRUD operations
├── types/
│   ├── auth.ts            # Auth-related TypeScript types
│   └── todo.ts            # Todo-related TypeScript types
├── config/
│   └── firebaseConfig.ts  # Firebase initialization (not in repo)
└── [README.md](http://readme.md/)

## Key Achievements

- **Type-Safe Implementation**: End-to-end type safety with TypeScript interfaces for auth, todos, and errors.
- **Clean Architecture**: Modular layers (services, context, components, types) for scalability and maintainability.
- **Secure Auth Flow**: Firebase Authentication with robust error handling and user feedback via alerts.
- **Real-Time Data**: Firestore integration for seamless todo CRUD operations with real-time updates.
- **Best Practices**: Consistent naming, code separation, and detailed documentation.

## What I Learned

- Advanced TypeScript in React Native (e.g., typing async functions, context, Firestore data)
- Firebase Authentication and Firestore setup/optimization
- Global state management with Context API and custom hooks
- Real-time database syncing with Firestore
- Responsive design and keyboard handling with Tailwind CSS in mobile apps
- Efficient navigation with Expo Router

Installation & Setup

1. Clone the Repository:
    
    git clone https://github.com/teyuu/my-auth-app.git
    cd my-auth-app
    ```
    
2. Install Dependencies:
   
    npm install

    
3. Configure Firebase:
    - Create a Firebase project and enable Email/Password authentication.
    - Add your Firebase config to config/firebaseConfig.ts (not in repo for security):
        
        typescript
        
        ```tsx
        import { initializeApp } from "firebase/app";
        import { getAuth } from "firebase/auth";
        
        const firebaseConfig = {
          apiKey: "your-api-key",
          authDomain: "your-auth-domain",
          // ... other config
        };
        
        const app = initializeApp(firebaseConfig);
        export const FIREBASE_AUTH = getAuth(app);
        ```
        
4. Run the App:

    ```
    npx expo start

