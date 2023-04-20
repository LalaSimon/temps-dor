import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../store/store";
import { AddTask } from "./AddTask";

describe("AddTask component", () => {
    it("renders input fields and buttons", () => {
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

    it("dispatches newTask action when form is submitted with valid data", () => {
        render(
            <Provider store={store}>
                <AddTask />
            </Provider>
        );

        const input = screen.getByPlaceholderText("Add new task");
        const deadlineInput = screen.getByPlaceholderText(
            "Type your task deadline"
        );
        const prioritySelect = screen.getByTestId("selectTestId");

        fireEvent.change(input, { target: { value: "Test task" } });
        fireEvent.change(deadlineInput, { target: { value: "2023-05-01" } });
        fireEvent.change(prioritySelect, { target: { value: "High" } });
        fireEvent.submit(screen.getByRole("button", { name: "Add task" }));

        expect(store.getState().newTask.list.length).toBe(1);
        expect(store.getState().newTask.list[0].title).toBe("Test task");
        expect(store.getState().newTask.list[0].deadline).toBe("2023-05-01");
        expect(store.getState().newTask.list[0].priority).toBe("High");
    });

    it("resets form fields and clears list when Clear list button is clicked", () => {
        render(
            <Provider store={store}>
                <AddTask />
            </Provider>
        );

        const input = screen.getByPlaceholderText(
            "Add new task"
        ) as HTMLInputElement;
        const deadlineInput = screen.getByPlaceholderText(
            "Type your task deadline"
        ) as HTMLInputElement;
        const prioritySelect = screen.getByTestId(
            "selectTestId"
        ) as HTMLSelectElement;

        fireEvent.change(input, { target: { value: "Test task" } });
        fireEvent.change(deadlineInput, { target: { value: "2023-05-01" } });
        fireEvent.change(prioritySelect, { target: { value: "High" } });
        fireEvent.click(screen.getByTestId("deleteBtn"));

        expect(store.getState().newTask.list.length).toBe(0);
        expect(input.value).toBe("");
        expect(deadlineInput.value).toBe("");
        expect(prioritySelect.value).toBe("");
    });
});
