import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
} from "firebase/firestore";
import { db } from "../../firebase";
import { getAuth } from "firebase/auth";

export interface MoveTaskPayload {
    fromIndex: number;
    toIndex: number;
    fromID: number;
    toID: number;
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

const getUserID = (): string | undefined | null => {
    return getAuth().currentUser?.email;
};
export const fetchList = createAsyncThunk("list/fetchList", async () => {
    const getUserEmail: string | undefined | null =
        getAuth().currentUser?.email;
    const response = await getDocs(collection(db, getUserEmail!));
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
        console.log(getUserID());
        const createTask = await addDoc(collection(db, getUserID()!), task);
        const addTask = await getDoc(createTask);
        return addTask.data() as Todo;
    }
);
export const deleteTaskThunk = createAsyncThunk(
    "list/deleteTask",
    async (task: Todo) => {
        const responseToShow = await getDocs(collection(db, getUserID()!));
        console.log(getUserID());
        const taskToDelete = responseToShow.docs.filter(
            (e) => Number(e.data().id) == Number(task.id)
        );
        await deleteDoc(doc(db, getUserID()!, taskToDelete[0].id));
        return taskToDelete[0].data().id;
    }
);

export const deleteWholeList = createAsyncThunk(
    "list/deleteWholeList",
    async () => {
        const querySnapshot = await getDocs(collection(db, getUserID()!));
        querySnapshot.forEach((doc) => {
            deleteDoc(doc.ref);
        });
    }
);

export const noveAllTasks = createAsyncThunk("list/moveTask", async () => {});

const taskListSlice = createSlice({
    name: "list",
    initialState,
    reducers: {
        moveTask: (state, action: PayloadAction<MoveTaskPayload>) => {
            const { fromIndex, toIndex, fromID, toID } = action.payload;
            console.log(fromIndex);
            const items = Array.from(state.list);
            const [reorderedItem] = items.splice(fromIndex, 1);
            items.splice(toIndex, 0, reorderedItem);
            items.forEach((e) => {
                e.id == fromID ? (e.id = toID) : null;
            });
            items.forEach((e) => {
                e.id == toID ? (e.id = fromID) : null;
            });
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
            console.log(action);
            state.list.push(task);
        });
        builder.addCase(deleteTaskThunk.fulfilled, (state, action) => {
            const deletedTask = action.payload;
            state.list = state.list.filter((task) => task.id !== deletedTask);
        });
        builder.addCase(deleteWholeList.fulfilled, (state) => {
            state.list = [];
        });
    },
});

export const { moveTask } = taskListSlice.actions;
export default taskListSlice.reducer;
