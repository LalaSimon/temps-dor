import { FormEvent } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTask } from "../../store/features/tasksSlice";
import { RootState } from "../../store/store";
const AddTask = () => {
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };
    return (
        <div>
            <form action="submit" className="flex flex-col gap-2 items-center">
                <input
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
