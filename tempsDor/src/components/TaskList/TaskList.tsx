import { useSelector } from "react-redux";
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
            <h2 className="text-3xl font-bold text-blue-600">Your tasks:</h2>
            <ul>
                {list?.map((task: Todo, taskIndex: number) => (
                    <div
                        key={task.id}
                        className="flex gap-2 border-2 border-grey-400 text-start p-1 rounded-lg"
                    >
                        <li className="">
                            {taskIndex + 1}. {task.title}
                        </li>
                        <span>{task.content}</span>
                        <button
                            onClick={() => handleSubmit(task.id)}
                            className="border-2 border-red-600 p-1 rounded"
                        >
                            X
                        </button>
                    </div>
                ))}
            </ul>
        </div>
    );
};

export { TaskList };
