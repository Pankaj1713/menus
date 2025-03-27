import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface userHandlerState {
    mode: string;
    currentPageTitle: {
        segment_one: string;
        segment_two: string;
    };
    backData: {
        url: string;
        title: string;
    };
}

const initialState: userHandlerState = {
    mode: 'view', 
    currentPageTitle: {
        segment_one: '',
        segment_two: '',
    },
    backData: {
        url: '',
        title: '',
    },
};

const userHandlerSlice = createSlice({
    name: 'userHandler',
    initialState,
    reducers: {
        setMode(state, action: PayloadAction<string>) {
            state.mode = action.payload;
        },
        setCurrentPageTitle(state, action: PayloadAction<{ segment_one: string; segment_two: string }>) {
            state.currentPageTitle = action.payload;
        },
        setBackData(state, action: PayloadAction<{ url: string; title: string }>) {
            state.backData = action.payload;
        },
    },
});

export const userHandlerSelector = (state: RootState) => state.userHandler; 
export const { setMode, setCurrentPageTitle, setBackData } = userHandlerSlice.actions;
export default userHandlerSlice.reducer;
