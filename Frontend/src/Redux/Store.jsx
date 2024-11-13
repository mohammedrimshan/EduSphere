// store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './Slices/userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['user/register/fulfilled', 'user/login/fulfilled'],
      },
    }),
});