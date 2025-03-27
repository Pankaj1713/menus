import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface SidebarProps {
    isOpen: boolean;
    isMobileSidebar : boolean;
    selectedItem: string | null;
}

const initialState: SidebarProps = {
    isOpen: true,
    selectedItem: null,
    isMobileSidebar:false
};

const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {
        toggleSidebar(state) {
            state.isOpen = !state.isOpen;
        },
        toggleMobileSidebar(state) {
            state.isMobileSidebar = !state.isMobileSidebar;
        },
        selectItem(state, action: PayloadAction<string>) {
            state.selectedItem = action.payload;
        },
    },
});

export const sidebarSelector = (state: RootState) => state.sidebar;

export const { toggleSidebar,toggleMobileSidebar, selectItem } = sidebarSlice.actions;
export default sidebarSlice.reducer;
