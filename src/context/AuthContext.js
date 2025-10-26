import React, { createContext, useContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Initial state
const initialState = {
  isAuthenticated: false,
  user: null,
  loading: true,
};

// Action types
const AUTH_ACTIONS = {
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGOUT: 'LOGOUT',
  SIGNUP_SUCCESS: 'SIGNUP_SUCCESS',
  SET_LOADING: 'SET_LOADING',
  RESTORE_USER: 'RESTORE_USER',
};

// Reducer function
const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        loading: false,
      };
    case AUTH_ACTIONS.SIGNUP_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        loading: false,
      };
    case AUTH_ACTIONS.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        loading: false,
      };
    case AUTH_ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case AUTH_ACTIONS.RESTORE_USER:
      return {
        ...state,
        isAuthenticated: action.payload !== null,
        user: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

// Create context
const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Restore user session on app start
  useEffect(() => {
    const restoreUser = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          const user = JSON.parse(userData);
          dispatch({ type: AUTH_ACTIONS.RESTORE_USER, payload: user });
        } else {
          dispatch({ type: AUTH_ACTIONS.RESTORE_USER, payload: null });
        }
      } catch (error) {
        console.error('Error restoring user:', error);
        dispatch({ type: AUTH_ACTIONS.RESTORE_USER, payload: null });
      }
    };

    restoreUser();
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true });

      // Simulate API call (in real app, you would call your authentication API)
      // For demo purposes, we'll use simple validation
      const storedUsers = await AsyncStorage.getItem('users');
      const users = storedUsers ? JSON.parse(storedUsers) : [];

      const user = users.find(
        u => u.email === email && u.password === password,
      );

      if (user) {
        // Remove password from user object before storing
        const userWithoutPassword = { ...user };
        delete userWithoutPassword.password;

        await AsyncStorage.setItem('user', JSON.stringify(userWithoutPassword));
        dispatch({
          type: AUTH_ACTIONS.LOGIN_SUCCESS,
          payload: userWithoutPassword,
        });
        return { success: true };
      } else {
        dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false });
        return { success: false, error: 'Invalid email or password' };
      }
    } catch (error) {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false });
      return { success: false, error: 'Login failed. Please try again.' };
    }
  };

  // Signup function
  const signup = async (name, email, password) => {
    try {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true });

      // Get existing users
      const storedUsers = await AsyncStorage.getItem('users');
      const users = storedUsers ? JSON.parse(storedUsers) : [];

      // Check if user already exists
      const existingUser = users.find(u => u.email === email);
      if (existingUser) {
        dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false });
        return { success: false, error: 'User with this email already exists' };
      }

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        name,
        email,
        password, // In real app, this should be hashed
        createdAt: new Date().toISOString(),
      };

      // Add to users array
      users.push(newUser);
      await AsyncStorage.setItem('users', JSON.stringify(users));

      // Login the user automatically after signup
      const userWithoutPassword = { ...newUser };
      delete userWithoutPassword.password;

      await AsyncStorage.setItem('user', JSON.stringify(userWithoutPassword));
      dispatch({
        type: AUTH_ACTIONS.SIGNUP_SUCCESS,
        payload: userWithoutPassword,
      });

      return { success: true };
    } catch (error) {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false });
      return { success: false, error: 'Signup failed. Please try again.' };
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await AsyncStorage.removeItem('user');
      dispatch({ type: AUTH_ACTIONS.LOGOUT });
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const value = {
    ...state,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
