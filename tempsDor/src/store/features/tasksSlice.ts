import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
} from "firebase/firestore";
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

export interface TaskListState {
    list: Todo[];
}

export const initialState: TaskListState = {
    list: [],
};

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

export const addTaskThunk = createAsyncThunk(
    "list/addTask",
    async (task: Todo) => {
        const createTask = await addDoc(collection(db, "tasks"), task);
        const addTask = await getDoc(createTask);
        return addTask.data() as Todo;
    }
);
export const deleteTaskThunk = createAsyncThunk(
    "list/deleteTask",
    async (task: Todo) => {
        const responseToShow = await getDocs(collection(db, "tasks"));
        const taskToDelete = responseToShow.docs.filter(
            (e) => Number(e.data().id) == Number(task.id)
        );

        console.log(task.id);
        const idToDB = responseToShow.docs[0].id;
        await deleteDoc(doc(db, "tasks", idToDB));
        return taskToDelete[0].data().id;
    }
);

const taskListSlice = createSlice({
    name: "list",
    initialState,
    reducers: {
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
        builder.addCase(addTaskThunk.fulfilled, (state, action) => {
            const task = action.payload;
            state.list.push(task);
        });
        builder.addCase(deleteTaskThunk.fulfilled, (state, action) => {
            const deletedTask = action.payload;
            state.list = state.list.filter((task) => task.id !== deletedTask);
        });
    },
});

export const { removeTask, deleteList, moveTask } = taskListSlice.actions;
export default taskListSlice.reducer;
