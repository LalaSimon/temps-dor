import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { AddTask } from "./AddTask";
import { store } from "../../store/store";

describe("AddTask component", () => {
    test("should render AddTask component with all input fields and buttons", () => {
        render(
            <Provider store={store}>
                <AddTask />
            </Provider>
        );

        expect(screen.getByPlaceholderText("Add new task")).toBeInTheDocument();
        expect(
            screen.getByPlaceholderText("Type your task deadline")
        ).toBeInTheDocument();
        expect(screen.getByText("Task priority")).toBeInTheDocument();
        expect(screen.getByText("Add task")).toBeInTheDocument();
        expect(screen.getByText("Clear list")).toBeInTheDocument();
    });

    test("should allow user to add new task", async () => {
        render(
            <Provider store={store}>
                <AddTask />
            </Provider>
        );

        const taskInput = screen.getByPlaceholderText("Add new task");
        const deadlineInput = screen.getByPlaceholderText(
            "Type your task deadline"
        );
        const prioritySelect = screen.getByTestId("selectTestId");
        const addButton = screen.getByText("Add task");

        fireEvent.change(taskInput, { target: { value: "Do the laundry" } });
        fireEvent.change(deadlineInput, { target: { value: "2022-01-01" } });
        fireEvent.change(prioritySelect, { target: { value: "High" } });

        fireEvent.click(addButton);

        expect(screen.getByText("Do the laundry")).toBeInTheDocument();
        expect(screen.getByText("2022-01-01")).toBeInTheDocument();
        expect(screen.getByText("High")).toBeInTheDocument();
    });

    test("should allow user to clear list of tasks", async () => {
        render(
            <Provider store={store}>
                <AddTask />
            </Provider>
        );

        const deleteButton = screen.getByTestId("deleteBtn");

        fireEvent.click(deleteButton);

        expect(screen.queryByText("Do the laundry")).toBeNull();
        expect(screen.queryByText("2022-01-01")).toBeNull();
        expect(screen.queryByText("High")).toBeNull();
    });
});
