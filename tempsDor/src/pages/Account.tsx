import { signInWithEmailAndPassword } from "firebase/auth";
import { FormEvent, useState } from "react";
import { SignIn } from "../components/SignIn/SignIn";
import { auth } from "../firebase";

const Account = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="min-h-screen flex flex-col justify-center items-center gap-10">
            <SignIn></SignIn>
            <div className="flex flex-col justify-center items-center gap-2">
                <h1> Sign up </h1>
                <form className="flex flex-col justify-center items-center text-center gap-2 text-lg">
                    <input
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
        </div>
    );
};

export { Account };
