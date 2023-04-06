import { createSlice } from "@reduxjs/toolkit";

interface listState {
    list: string[];
}

const initialState: listState = {
    list: [],
};

const taskListSlice = createSlice({
    name: "list",
    initialState,
    reducers: {
        addTask(state, action) {
            state.list.push(action.payload);
        },
    },
});

export const { addTask } = taskListSlice.actions;

export default taskListSlice.reducer;
