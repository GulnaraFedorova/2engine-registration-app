import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userData: null,
    entries: [],
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserData(state, action) {
            state.userData = action.payload;
        },
        addEntry(state, action) {
            state.entries.push(action.payload);
        },
        updateEntry(state, action) {
            const { id, title, description } = action.payload;
            const existingEntry = state.entries.find((entry) => entry.id === id);
            if (existingEntry) {
                existingEntry.title = title;
                existingEntry.description = description;
            }
        },
        deleteEntry(state, action) {
            state.entries = state.entries.filter(entry => entry.id !== action.payload);
        },
    },
});

export const { setUserData, addEntry, updateEntry, deleteEntry } = userSlice.actions;
export default userSlice.reducer;
