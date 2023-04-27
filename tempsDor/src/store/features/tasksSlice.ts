import {
    createSlice,
    PayloadAction,
    createAsyncThunk,
    Action,
} from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { useAppDispatch } from "../store";

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
    const fetchedState: any = [];
    response.forEach((docs) => {
        fetchedState.push(docs.data());
    });
    console.log(fetchedState);
    return fetchedState;
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
        builder.addCase(fetchList.fulfilled, (state, action) => {
            action.payload.sort((a: Todo, b: Todo) => {
                return a.id - b.id;
            });
            state.list.push(...action.payload);
        });
    },
});

export const { newTask, removeTask, deleteList, moveTask } =
    taskListSlice.actions;
export default taskListSlice.reducer;
