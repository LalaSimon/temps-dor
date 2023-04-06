import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTask } from "../../store/features/tasksSlice";
import { RootState } from "../../store/store";

const TaskList = () => {
    return (
        <div>
            <h2 className="text-3xl font-bold text-blue-600">Your tasks:</h2>
        </div>
    );
};

export { TaskList };
