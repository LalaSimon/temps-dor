import { useEffect, useState, useRef } from "react";
import { moveTask, removeTask } from "../../store/features/tasksSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { Todo } from "../../store/features/tasksSlice";
import {
    DragDropContext,
    Droppable,
    Draggable,
    DropResult,
} from "react-beautiful-dnd";
import { fetchList } from "../../store/features/tasksSlice";

const TaskList = () => {
    const dispatch = useAppDispatch();
    const isFirstRender = useRef(true);
    useEffect(() => {
        if (isFirstRender.current) {
            // Wykonaj logikę tylko przy pierwszym renderowaniu
            dispatch(fetchList());
            isFirstRender.current = false;
        }
    }, []);
    const list = useAppSelector((state) => state.tasks.list);

    const handleSubmit = (id: number): void => {
        dispatch(removeTask(id));
    };

    const handleDragEnd = (result: DropResult) => {
        if (!result.destination) {
            return;
        }
        dispatch(
            moveTask({
                fromIndex: result.source.index,
                toIndex: result.destination.index,
            })
        );
    };

    return (
        <DragDropContext
            onDragEnd={(result: DropResult) => handleDragEnd(result)}
        >
            <div className=" flex flex-col px-7 relative mt-10">
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
                                        key={taskIndex}
                                        draggableId={`task-${task.id}`}
                                        index={taskIndex}
                                    >
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                className="flex flex-col gap-1 w-96 p-3 border-2 border-black"
                                            >
                                                <div className="flex items-center w-full justify-between">
                                                    <li className="uppercase font-bold">
                                                        {taskIndex + 1}.{" "}
                                                        {task.topic}
                                                    </li>

                                                    <button
                                                        onClick={() =>
                                                            handleSubmit(
                                                                task.id
                                                            )
                                                        }
                                                        className="border-2 border-red-600 p-1 rounded self-center"
                                                    >
                                                        X
                                                    </button>
                                                </div>

                                                <p className="text-xs italic text-gray-400">
                                                    <strong>Deadline: </strong>
                                                    {task.deadline}
                                                </p>
                                                <p className="text-xs text-gray-400">
                                                    <strong>Priority: </strong>
                                                    {(() => {
                                                        switch (task.priority) {
                                                            case "High":
                                                                return (
                                                                    <span className="text-red-600 font-bold">
                                                                        {
                                                                            task.priority
                                                                        }
                                                                    </span>
                                                                );
                                                            case "Medium":
                                                                return (
                                                                    <span className="text-yellow-500 font-bold">
                                                                        {
                                                                            task.priority
                                                                        }
                                                                    </span>
                                                                );
                                                            case "Low":
                                                                return (
                                                                    <span className="text-green-600 font-bold">
                                                                        {
                                                                            task.priority
                                                                        }
                                                                    </span>
                                                                );
                                                            default:
                                                                return null;
                                                        }
                                                    })()}
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
                {list.length >= 4 ? (
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
