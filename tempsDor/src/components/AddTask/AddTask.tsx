import { FormEvent } from "react";
import { useState } from "react";
import { deleteList, newTask } from "../../store/features/tasksSlice";
import { useAppDispatch } from "../../store/store";
import { useSelector } from "react-redux";

const AddTask = () => {
    const dispatch = useAppDispatch();
    const list = useSelector((state: any) => state.newTask.list);
    const [topic, setTopic] = useState<string>("");
    const [textAreaContent, setTextAreaContent] = useState("");

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(newTask({ title: topic, content: textAreaContent }));
        setTopic("");
        setTextAreaContent("");
    };
    const handleReset = (e: FormEvent) => {
        dispatch(deleteList());
        setTopic("");
        setTextAreaContent("");
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
                    placeholder="Add new task topic"
                    className="border-2 rounded-xl p-3 w-96 text-center"
                ></input>
                <textarea
                    onChange={(e) => setTextAreaContent(e.target.value)}
                    value={textAreaContent}
                    placeholder="Type your task description"
                    maxLength={35}
                    className="border-2 rounded-xl p-3 w-96 text-center resize-none"
                ></textarea>
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
