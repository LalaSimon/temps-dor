import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Todo {
    id: number;
    title: string;
    completed: boolean;
}
export interface TaskListState {
    list: Todo[];
}

const initialState: TaskListState = {
    list: [],
};

const taskListSlice = createSlice({
    name: "list",
    initialState,
    reducers: {
        addTask: (
            state,
            action: PayloadAction<{
                title: string;
            }>
        ) => {
            state.list.push({
                id: new Date().getTime(),
                title: action.payload.title,
                completed: false,
            });
        },
    },
});

export const { addTask } = taskListSlice.actions;

export default taskListSlice.reducer;
