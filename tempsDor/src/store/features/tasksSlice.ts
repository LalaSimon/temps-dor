import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

export interface MoveTaskPayload {
    fromIndex: number;
    toIndex: number;
}

export interface Todo {
    id: number;
    topic: string;
    deadline: string;
    priority: string;
    completed: boolean;
}
export const fetchList = createAsyncThunk("list/fetchList", async () => {
    const response = await getDocs(collection(db, "tasks"));
    const todos: Todo[] = response.docs.map((doc) => {
        const data = doc.data();
        return {
            id: data.id,
            topic: data.topic,
            deadline: data.deadline,
            priority: data.priority,
            completed: false,
        };
    });
    return todos.sort((a, b) => a.id - b.id);
});

export interface TaskListState {
    list: Todo[];
}

export const initialState: TaskListState = {
    list: [],
};

const taskListSlice = createSlice({
    name: "list",
    initialState,
    reducers: {
        newTask: (
            state,
            action: PayloadAction<{
                topic: string;
                deadline: string;
                priority: string;
                id: number;
            }>
        ) => {
            state.list.push({
                id: action.payload.id,
                topic: action.payload.topic,
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
    extraReducers: (builder) => {
        builder.addCase(
            fetchList.fulfilled,
            (state, action: PayloadAction<Todo[]>) => {
                state.list = action.payload;
            }
        );
    },
});

export const { newTask, removeTask, deleteList, moveTask } =
    taskListSlice.actions;
export default taskListSlice.reducer;
