import { AddTask } from "../components/AddTask";
import { TaskList } from "../components/TaskList";

const Home = () => {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center gap-2">
            <TaskList></TaskList>
            <AddTask></AddTask>
        </div>
    );
};

export { Home };
