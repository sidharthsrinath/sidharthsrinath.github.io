import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ThemeState } from '.';
import { lightState } from '../states/theme-states';
 

export const ThemeSlice = createSlice({
    name: 'Theme',
    initialState: lightState,
    reducers: {
    updateTheme: (state, action:PayloadAction<ThemeState>) => {
        const { c0, c1, c2, c3, c4, c5 } = action.payload;
        state.c0 = c0;
        state.c1 = c1;
        state.c2 = c2;
        state.c3 = c3;
        state.c4 = c4;
        state.c5 = c5;
    }
  },
});

export const { updateTheme } = ThemeSlice.actions;

export default ThemeSlice.reducer;
