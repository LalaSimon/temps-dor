import { FormEvent, useRef } from "react";
import { useState } from "react";
import { addTask } from "../../store/features/tasksSlice";
import { useAppDispatch } from "../../store/store";
const AddTask = () => {
    const id = useRef<number>();
    const dispatch = useAppDispatch();

    const [topic, setTopic] = useState<string>("");

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(addTask({ title: topic }));
    };
    return (
        <div>
            <form
                onSubmit={handleSubmit}
                action="submit"
                className="flex flex-col gap-2 items-center"
            >
                <input
                    onChange={(e) => setTopic(e.target.value)}
                    type="text"
                    placeholder="Add new task topic"
                    className="border-2 rounded-xl p-3 w-96 text-center"
                ></input>
                <textarea
                    placeholder="Type your task description"
                    maxLength={250}
                    className="border-2 rounded-xl p-3 w-96 text-center resize-none"
                ></textarea>
                <button
                    type="submit"
                    className="border-2 rounded-xl w-36 p-2 text-center"
                >
                    Add task
                </button>
            </form>
        </div>
    );
};

export { AddTask };
