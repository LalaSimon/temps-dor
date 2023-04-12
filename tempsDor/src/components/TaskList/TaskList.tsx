import { useSelector } from "react-redux";

const TaskList = () => {
    const list = useSelector((state: any) => state.addTask.list);
    console.log(list);
    return (
        <div>
            <h2 className="text-3xl font-bold text-blue-600">Your tasks:</h2>
            <ul>
                {list?.map((task: any, taskIndex: number) => (
                    <li
                        className="border-2 border-grey-400 text-start p-1 rounded-lg"
                        key={task.id}
                    >
                        {taskIndex + 1}. {task.title}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export { TaskList };
