import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './slices/theme-slice';

export const store = configureStore({
    reducer: {
        theme: themeReducer, 
    },
});

// Define RootState based on the store's reducer structure
export type RootState = ReturnType<typeof store.getState>;

// Export typed hooks that can be used throughout the application
export type AppDispatch = typeof store.dispatch;