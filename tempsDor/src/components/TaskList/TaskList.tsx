import { useSelector } from "react-redux";
import { useState } from "react";
import { removeTask } from "../../store/features/tasksSlice";
import { useAppDispatch } from "../../store/store";
import { Todo } from "../../store/features/tasksSlice";

const TaskList = () => {
    const dispatch = useAppDispatch();
    const list = useSelector((state: any) => state.newTask.list);

    const handleSubmit = (id: number): void => {
        dispatch(removeTask(id));
    };

    return (
        <div>
            <h2 className="text-3xl font-bold text-blue-600 text-center mb-2">
                Your tasks:
            </h2>
            {list.length <= 0 ? (
                <p className="mb-6"> You dont have any tasks : (</p>
            ) : (
                <ul className="flex flex-col gap-3">
                    {list?.map((task: Todo, taskIndex: number) => (
                        <div key={task.id} className="flex flex-col gap-2 w-96">
                            <div className="flex items-center w-full justify-between">
                                <li className="uppercase font-bold">
                                    {taskIndex + 1}. {task.title}
                                </li>

                                <button
                                    onClick={() => handleSubmit(task.id)}
                                    className="border-2 border-red-600 p-1 rounded"
                                >
                                    X
                                </button>
                            </div>

                            <p className="text-xs sticky bottom-0 italic text-gray-400">
                                {task.content}
                            </p>
                        </div>
                    ))}
                </ul>
            )}
        </div>
    );
};

export { TaskList };