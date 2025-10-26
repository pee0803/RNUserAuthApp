# RNUserAuthApp - React Native User Authentication App

A React Native application that implements user authentication functionality including login and signup screens using React Context API for state management.

## Features

✅ **Authentication Context Setup**
- Implements `AuthContext` using React's Context API to manage global authentication state
- Provides `login`, `signup`, and `logout` functions
- Manages `user` state to store currently logged-in user's information

✅ **Screens**
1. **Login Screen**
   - Input fields for Email and Password
   - "Login" button that triggers the `login` function from `AuthContext`
   - Shows error messages for invalid email/password format and missing fields
   - "Go to Signup" button to navigate to the Signup screen

2. **Signup Screen**
   - Input fields for Name, Email, and Password
   - "Signup" button that triggers the `signup` function from `AuthContext`
   - Shows error messages for missing fields, invalid email format, and password length (less than 6 characters)
   - "Go to Login" button to navigate back to the Login screen

3. **Home Screen**
   - Displays the currently logged-in user's name and email
   - "Logout" button to log out the user and return to the Login screen

✅ **Persist Authentication (Optional)**
- Uses `AsyncStorage` to persist the authentication state so that the user remains logged in after the app is closed and reopened

✅ **Navigation**
- Uses React Navigation to manage navigation between Login Screen, Signup Screen, and Home Screen

✅ **UI Design**
- Clean, visually appealing layout with intuitive navigation
- Appropriate styles for input fields, buttons, and error messages

## Project Structure

```
RNUserAuthApp/
├── src/
│   ├── components/          # Reusable UI components
│   ├── context/
│   │   └── AuthContext.js   # Authentication context and provider
│   ├── navigation/
│   │   └── AppNavigator.js  # Navigation setup
│   ├── screens/
│   │   ├── LoginScreen.js   # Login screen component
│   │   ├── SignupScreen.js  # Signup screen component
│   │   └── HomeScreen.js    # Home screen component
│   └── utils/
│       └── validation.js    # Form validation utilities
├── App.tsx                  # Main app component
├── index.js                 # App entry point
└── package.json             # Dependencies and scripts
```

## Dependencies

- **@react-navigation/native**: Core navigation library
- **@react-navigation/stack**: Stack navigator for screen transitions
- **react-native-screens**: Native screen components for better performance
- **react-native-safe-area-context**: Safe area handling
- **react-native-gesture-handler**: Touch gesture handling
- **@react-native-async-storage/async-storage**: Local storage for persistence

## Installation & Setup

1. **Clone and navigate to the project:**
   ```bash
   cd ~/Workspace/RNUserAuthApp
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Install iOS dependencies (iOS only):**
   ```bash
   cd ios && pod install && cd ..
   ```

4. **Run on iOS:**
   ```bash
   npx react-native run-ios
   ```

5. **Run on Android:**
   ```bash
   npx react-native run-android
   ```

## Usage

1. **First Time Users:**
   - Open the app to see the Login screen
   - Tap "Go to Signup" to create a new account
   - Fill in Name, Email, and Password (minimum 6 characters)
   - Tap "Signup" to create account and automatically login

2. **Existing Users:**
   - Enter your email and password on the Login screen
   - Tap "Login" to access the Home screen

3. **Home Screen:**
   - View your profile information (name, email, member since date)
   - Tap "Logout" to return to the Login screen

## Authentication Flow

1. **App Launch:**
   - App checks AsyncStorage for existing user session
   - If found, automatically navigates to Home screen
   - If not found, shows Login screen

2. **Login Process:**
   - Validates email format and required fields
   - Checks credentials against stored users in AsyncStorage
   - On success, stores user data and navigates to Home screen
   - On failure, shows appropriate error message

3. **Signup Process:**
   - Validates all required fields and formats
   - Checks if user already exists
   - Creates new user and stores in AsyncStorage
   - Automatically logs in the new user

4. **Logout Process:**
   - Removes user data from AsyncStorage
   - Updates authentication state
   - Navigates back to Login screen

## Validation Rules

- **Email:** Must be a valid email format
- **Password:** Minimum 6 characters required
- **Name:** Required field, minimum 2 characters
- **All fields:** Required and cannot be empty

## Error Handling

- Form validation with real-time error display
- Network error handling (for future API integration)
- User-friendly error messages
- Loading states during authentication processes

## Future Enhancements

- Password visibility toggle
- "Remember Me" functionality
- Password reset functionality
- Biometric authentication
- Social login integration
- Email verification
- Profile editing capabilities
