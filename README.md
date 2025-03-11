Todos App.
A mobile app with authentication built with React Native, TypeScript, Expo, and Firebase Authentication. This project showcases a modern, secure, and scalable approach to user authentication, featuring login, signup, and logout flows. It’s designed to demonstrate my expertise in mobile development, type-safe coding, and integrating backend services.

Features

- User Authentication:
    - Sign-up with email, password, and name (with password confirmation)
    - Login with email and password
    - Logout functionality
- Form Validation:
    - Email format checking
    - Password length requirements (minimum 6 characters)
    - Matching password confirmation for signup
- Responsive UI:
    - Clean, mobile-friendly design with Tailwind CSS (via NativeWind)
    - Keyboard-avoiding views and scrollable forms for better UX
- State Management:
    - Global auth context with React Context API
    - Real-time user state updates via Firebase’s onAuthStateChanged
- Navigation:
    - Expo Router for seamless, file-based navigation
    - Protected routes based on authentication status

Tech Stack

- React Native: Cross-platform mobile framework
- Expo: Simplified development and deployment workflow
- TypeScript: Static typing for robust, maintainable code
- Firebase Authentication: Secure backend for user management
- Tailwind CSS (NativeWind): Utility-first styling
- Expo Router: Modern navigation solution

Project Structure

```
├── app/
│   └── auth.tsx          # Authentication screen with login/signup
├── components/
│   └── InputField.tsx    # Reusable form input component
├── context/
│   └── AuthProvider.tsx  # Global auth context and state management
├── hooks/
│   └── useAuth.ts        # Custom hook for auth access
├── services/
│   └── authService.ts    # Firebase authentication logic
├── types/
│   └── auth.ts           # TypeScript type definitions
└── README.md
```

Key Achievements

- Type-Safe Implementation: Leveraged TypeScript for end-to-end type safety, defining interfaces for form data, auth context, and errors.
- Clean Architecture: Organized code into modular layers (services, context, components, types) for scalability and maintainability.
- Secure Auth Flow: Integrated Firebase Authentication with proper error handling and user feedback via alerts.
- User Experience: Built a responsive UI with loading states, form validation, and smooth navigation.
- Best Practices: Applied modern development standards, including consistent naming, code separation, and documentation.

What I Learned

- Advanced TypeScript in React Native (e.g., typing async functions, context)
- Firebase Authentication setup and optimization
- Global state management with Context API and custom hooks
- Responsive design with Tailwind CSS in mobile apps
- Efficient navigation with Expo Router


