import { FormEvent } from "react";
import { useState } from "react";
import { deleteList, newTask } from "../../store/features/tasksSlice";
import { useAppDispatch } from "../../store/store";
import { useSelector } from "react-redux";

const AddTask = () => {
    const dispatch = useAppDispatch();
    const list = useSelector((state: any) => state.newTask.list);
    const [topic, setTopic] = useState<string>("");
    const [deadlineTime, setDeadlineTime] = useState("");
    const [priority, setPriority] = useState("");
    const [resetSelectKey, setResetSelectKey] = useState(0);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(
            newTask({
                title: topic,
                deadline: deadlineTime,
                priority: priority,
            })
        );
        setTopic("");
        setDeadlineTime("");
        setPriority("reset");
        setResetSelectKey(resetSelectKey + 1);
    };
    const handleReset = (e: FormEvent) => {
        dispatch(deleteList());
        setTopic("");
        setDeadlineTime("");
        setPriority("");
    };
    return (
        <div>
            <form
                onSubmit={handleSubmit}
                action="submit"
                className="flex flex-col gap-2 items-center"
            >
                <input
                    maxLength={25}
                    required
                    onChange={(e) => setTopic(e.target.value)}
                    value={topic}
                    type="text"
                    placeholder="Add new task"
                    className="border-2 rounded-xl p-3 w-96 text-center"
                ></input>
                <input
                    onChange={(e) => setDeadlineTime(e.target.value)}
                    value={deadlineTime}
                    placeholder="Type your task deadline"
                    maxLength={25}
                    className="border-2 rounded-xl p-3 w-96 text-center resize-none"
                ></input>
                <select
                    onChange={(e) => setPriority(e.target.value)}
                    className="border-2 rounded-xl p-3 w-96 text-center"
                    required
                    defaultValue=""
                    key={resetSelectKey}
                >
                    <option value="" disabled hidden>
                        Task priority
                    </option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>
                <div className="flex gap-2">
                    <button
                        type="submit"
                        className="border-2 rounded-xl w-36 p-2 text-center"
                    >
                        Add task
                    </button>
                    <button
                        onClick={(e) => handleReset(e)}
                        type="button"
                        className="border-2 rounded-xl w-36 p-2 text-center"
                    >
                        Clear list
                    </button>
                </div>
            </form>
        </div>
    );
};

export { AddTask };
