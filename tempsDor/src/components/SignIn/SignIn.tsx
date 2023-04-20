import { signInWithEmailAndPassword } from "firebase/auth";
import { FormEvent, useState } from "react";
import { auth } from "../../firebase";

export const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const SignInHandle = (e: FormEvent): void => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    return (
        <div className="flex flex-col justify-center items-center gap-2">
            <h1>Sign in</h1>
            <form
                onSubmit={(e) => SignInHandle(e)}
                className="flex flex-col justify-center items-center text-center gap-2 text-lg"
            >
                <input
                    type="email"
                    placeholder="E-mail"
                    className="border-2 border-gray-400 rounded-xl p-3 text-center w-72"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                ></input>
                <input
                    type="password"
                    placeholder="Password"
                    className="border-2 border-gray-400 rounded-xl p-3 text-center w-72"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                ></input>
                <button
                    type="submit"
                    className="border-2 border-gray-400 rounded-xl p-2 w-24"
                >
                    Sign in
                </button>
            </form>
        </div>
    );
};
