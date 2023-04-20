import { createUserWithEmailAndPassword } from "firebase/auth";
import { FormEvent, useState } from "react";
import { auth } from "../../firebase";

export const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const SignUpHandle = (e: FormEvent) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    return (
        <div className="flex flex-col justify-center items-center gap-2">
            <h1> Create account</h1>
            <form
                onSubmit={(e) => SignUpHandle(e)}
                className="flex flex-col justify-center items-center text-center gap-2 text-lg"
            >
                <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="E-mail"
                    className="border-2 border-gray-400 rounded-xl p-3 text-center w-72"
                ></input>
                <input
                    type="login"
                    placeholder="Repeat your E-mail"
                    className="border-2 border-gray-400 rounded-xl p-3 text-center w-72"
                ></input>
                <input
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Password"
                    className="border-2 border-gray-400 rounded-xl p-3 text-center w-72"
                ></input>
                <input
                    type="password"
                    placeholder="Repeat your Password"
                    className="border-2 border-gray-400 rounded-xl p-3 text-center w-72"
                ></input>
                <button
                    type="submit"
                    className="border-2 border-gray-400 rounded-xl p-2 w-24"
                >
                    Sign Up
                </button>
            </form>
        </div>
    );
};
