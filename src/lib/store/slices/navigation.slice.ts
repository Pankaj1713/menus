import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface NavigationState {
    currentRoute: string;
    previousRoute: string | null;
    pageTitle: {
        normal: string;
        highlight: string;
    };
}

const initialState: NavigationState = {
    currentRoute: '',
    previousRoute: null,
    pageTitle: {
        normal: '',
        highlight: '',
    },
};

const navigationSlice = createSlice({
    name: 'navigation',
    initialState,
    reducers: {
        setCurrentRoute(state, action: PayloadAction<string>) {
            state.previousRoute = state.currentRoute;
            state.currentRoute = action.payload;
        },
        setPageTitle(state, action: PayloadAction<{ normal: string; highlight: string }>) {
            state.pageTitle = action.payload;
        },
    },
});

export const { setCurrentRoute, setPageTitle } = navigationSlice.actions;
export const navigationSelector = (state: RootState) => state.navigation;
export default navigationSlice.reducer;
