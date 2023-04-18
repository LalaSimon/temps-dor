import { useSelector } from "react-redux";
import { useState } from "react";
import { removeTask } from "../../store/features/tasksSlice";
import { useAppDispatch } from "../../store/store";
import { Todo } from "../../store/features/tasksSlice";
import {
    DragDropContext,
    Droppable,
    Draggable,
    DropResult,
} from "react-beautiful-dnd";

const TaskList = () => {
    const dispatch = useAppDispatch();
    const list = useSelector((state: any) => state.newTask.list);

    const handleSubmit = (id: number): void => {
        dispatch(removeTask(id));
    };

    const handleDragEnd = (result: DropResult) => {
        if (!result.destination) {
            return;
        }
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <div className=" flex flex-col px-7 mb-2 relative">
                <h2 className="text-3xl font-bold text-blue-600 text-center mb-2">
                    Your tasks:
                </h2>
                {list.length <= 0 ? (
                    <p className="mb-6"> You dont have any tasks : (</p>
                ) : (
                    <Droppable droppableId="taskList">
                        {(provided) => (
                            <ul
                                className="flex flex-col gap-3 overflow-y-visible taskHidyScroll overflow-x-auto h-96"
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {list.map((task: Todo, taskIndex: number) => (
                                    <Draggable
                                        key={task.id}
                                        draggableId={`task-${task.id}`}
                                        index={taskIndex}
                                    >
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                className="flex flex-col gap-2 w-96 p-3"
                                            >
                                                <div className="flex items-center w-full justify-between">
                                                    <li className="uppercase font-bold">
                                                        {taskIndex + 1}.{" "}
                                                        {task.title}
                                                    </li>

                                                    <button
                                                        onClick={() =>
                                                            handleSubmit(
                                                                task.id
                                                            )
                                                        }
                                                        className="border-2 border-red-600 p-1 rounded"
                                                    >
                                                        X
                                                    </button>
                                                </div>

                                                <p className="text-xs italic text-gray-400">
                                                    {task.content}
                                                </p>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </ul>
                        )}
                    </Droppable>
                )}
                {list.length >= 5 ? (
                    <div className="absolute arrows flex">
                        <i className="fa-solid fa-arrow-up-wide-short fa-2xl text-gray-400 absolute"></i>
                        <i className="fa-solid fa-arrow-down-short-wide fa-2xl text-gray-400 absolute"></i>
                    </div>
                ) : null}
            </div>
        </DragDropContext>
    );
};

export { TaskList };
