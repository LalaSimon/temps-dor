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
        newTask: (
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
        removeTask: (state, action: PayloadAction<number>) => {
            const idToRemove = action.payload;
            state.list = state.list.filter((task) => task.id !== idToRemove);
        },
    },
});

export const { newTask } = taskListSlice.actions;
export const { removeTask } = taskListSlice.actions;

export default taskListSlice.reducer;
