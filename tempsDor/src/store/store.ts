import { configureStore } from "@reduxjs/toolkit";
import tasksSlice from "./features/tasksSlice";
//import counterReducer from "./features/counterSlice";

const store = configureStore({
    reducer: {
        addTask: tasksSlice,
    },
});

export { store };
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
