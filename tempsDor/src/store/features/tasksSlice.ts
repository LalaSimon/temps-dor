import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Todo {
    id: number;
    title: string;
    content: string;
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
                content: string;
            }>
        ) => {
            state.list.push({
                id: new Date().getTime(),
                title: action.payload.title,
                content: action.payload.content,
                completed: false,
            });
        },
        removeTask: (state, action: PayloadAction<number>) => {
            const idToRemove = action.payload;
            state.list = state.list.filter((task) => task.id !== idToRemove);
        },
        deleteList: (state) => {
            state.list = [];
        },
    },
});

export const { newTask } = taskListSlice.actions;
export const { removeTask } = taskListSlice.actions;
export const { deleteList } = taskListSlice.actions;

export default taskListSlice.reducer;
