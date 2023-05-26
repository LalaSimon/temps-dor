import { useRef, useEffect } from "react";
import { deleteTaskThunk, moveTask } from "../../store/features/tasksSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { Todo } from "../../store/features/tasksSlice";
import {
    DragDropContext,
    Droppable,
    Draggable,
    DropResult,
} from "react-beautiful-dnd";
import { fetchList } from "../../store/features/tasksSlice";
import { Priority } from "../Priority/Priority";

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

    const handleDelete = (task: Todo): void => {
        dispatch(deleteTaskThunk(task));
    };

    const handleDragEnd = (result: DropResult) => {
        if (!result.destination) {
            return;
        }
        console.log(result);
        dispatch(
            moveTask({
                fromIndex: Number(result.source.index),
                toIndex: Number(result.destination.index),
                fromID: Number(result.source.droppableId),
                toID: Number(result.destination.droppableId),
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
                                        draggableId={task.id.toString()}
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
                                                            handleDelete(task)
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
                                                    <Priority
                                                        topic={task.topic}
                                                        deadline={task.deadline}
                                                        priority={task.priority}
                                                        id={task.id}
                                                        completed={
                                                            task.completed
                                                        }
                                                    ></Priority>
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
