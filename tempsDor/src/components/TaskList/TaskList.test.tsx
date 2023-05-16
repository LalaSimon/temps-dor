import { Todo } from "../../store/features/tasksSlice";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../store/store";
import { TaskList } from "./TaskList";
import { addTaskThunk } from "../../store/features/tasksSlice";

describe("TaskList", () => {
    test("renders task list", () => {
        const task1: Todo = {
            id: 1,
            topic: "Task 1",
            priority: "High",
            deadline: "2023-04-30",
            completed: false,
        };
        const task2: Todo = {
            id: 2,
            topic: "Task 2",
            priority: "Medium",
            deadline: "2023-05-10",
            completed: false,
        };
        store.dispatch(addTaskThunk(task1));
        store.dispatch(addTaskThunk(task2));
        render(
            <Provider store={store}>
                <TaskList />
            </Provider>
        );
        const task1Element = screen.getByText(/1. Task 1/i);
        const task2Element = screen.getByText(/2. Task 2/i);
        expect(task1Element).toBeInTheDocument();
        expect(task2Element).toBeInTheDocument();
    });
});
