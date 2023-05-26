import { Todo } from "../../store/features/tasksSlice";

export const Priority = (task: Todo) => {
    switch (task.priority) {
        case "High":
            return (
                <span className="text-red-600 font-bold">{task.priority}</span>
            );
        case "Medium":
            return (
                <span className="text-yellow-500 font-bold">
                    {task.priority}
                </span>
            );
        case "Low":
            return (
                <span className="text-green-600 font-bold">
                    {task.priority}
                </span>
            );
        default:
            return null;
    }
};
