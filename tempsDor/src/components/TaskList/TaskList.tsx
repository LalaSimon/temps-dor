import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTask } from "../../store/features/tasksSlice";
import { Todo } from "../../store/features/tasksSlice";
import { TaskListState } from "../../store/features/tasksSlice";

const TaskList = () => {
    const list = useSelector((state: any) => state.addTask.list);
    console.log(list);
    return (
        <div>
            <h2 className="text-3xl font-bold text-blue-600">Your tasks:</h2>
            <ul>
                {list?.map((task: any) => (
                    <li key={task.id}>{task.title}</li>
                ))}
            </ul>
        </div>
    );
};

export { TaskList };
