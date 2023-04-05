import { configureStore } from "@reduxjs/toolkit";
//import counterReducer from "./features/counterSlice";

const store = configureStore({
    reducer: {},
});

export { store };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
