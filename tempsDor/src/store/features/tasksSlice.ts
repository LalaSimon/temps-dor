import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MoveTaskPayload {
    fromIndex: number;
    toIndex: number;
}

export interface Todo {
    id: number;
    title: string;
    deadline: string;
    priority: string;
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
                deadline: string;
                priority: string;
            }>
        ) => {
            state.list.push({
                id: new Date().getTime(),
                title: action.payload.title,
                deadline: action.payload.deadline,
                priority: action.payload.priority,
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
        moveTask: (state, action: PayloadAction<MoveTaskPayload>) => {
            const { fromIndex, toIndex } = action.payload;
            const items = Array.from(state.list);
            const [reorderedItem] = items.splice(fromIndex, 1);
            items.splice(toIndex, 0, reorderedItem);
            return { ...state, list: items };
        },
    },
});

export const { newTask } = taskListSlice.actions;
export const { removeTask } = taskListSlice.actions;
export const { deleteList } = taskListSlice.actions;
export const { moveTask } = taskListSlice.actions;

export default taskListSlice.reducer;
