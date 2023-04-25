import { FormEvent } from "react";
import { useState } from "react";
import { deleteList, newTask } from "../../store/features/tasksSlice";
import { useAppDispatch } from "../../store/store";
import { auth, app } from "../../firebase";
import { getFirestore } from "firebase/firestore";
import { addDoc, collection, getDocs } from "firebase/firestore";

export const AddTask = () => {
    const dispatch = useAppDispatch();
    const DEFAULT_VALUE = "";
    const [topic, setTopic] = useState<string>("");
    const [deadlineTime, setDeadlineTime] = useState("");
    const [priority, setPriority] = useState("");

    const resetForm = (): void => {
        setTopic(DEFAULT_VALUE);
        setDeadlineTime(DEFAULT_VALUE);
        setPriority(DEFAULT_VALUE);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const db = getFirestore(app);

        dispatch(
            newTask({
                topic: topic,
                deadline: deadlineTime,
                priority: priority,
            })
        );
        try {
            const docRef = await addDoc(collection(db, "tasks"), {
                topic: topic,
                deadline: deadlineTime,
                priority: priority,
            });

            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
        resetForm();
    };

    const handleReset = () => {
        resetForm();
        dispatch(deleteList());
    };

    const renderClick = async () => {
        const db = getFirestore(app);
        const querySnapshot = await getDocs(collection(db, "tasks"));
        console.log(querySnapshot.docs[0].data().topic);
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${JSON.stringify(doc.data().topic)}`);
            console.log(`${doc.id} => ${JSON.stringify(doc.data().deadline)}`);
            console.log(`${doc.id} => ${JSON.stringify(doc.data().priority)}`);
        });
    };

    return (
        <div>
            <form
                onSubmit={handleSubmit}
                action="submit"
                className="flex flex-col gap-2 items-center"
            >
                <input
                    data-test-id="test"
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
                    data-test-id="selectTestId"
                    onChange={(e) => setPriority(e.target.value)}
                    className="border-2 rounded-xl p-3 w-96 text-center"
                    required
                    value={priority}
                >
                    <option value="" hidden defaultValue="">
                        Task priority
                    </option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>
                <div className="flex gap-2">
                    <button
                        onClick={() => {
                            renderClick();
                        }}
                        type="submit"
                        className="border-2 rounded-xl w-36 p-2 text-center"
                    >
                        Add task
                    </button>
                    <button
                        data-test-id="deleteBtn"
                        onClick={() => handleReset()}
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
