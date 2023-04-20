import { SignIn } from "../components/SignIn/SignIn";
import { SignUp } from "../components/SignUp/SignUp";

const Account = () => {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center gap-10">
            <SignIn></SignIn>
            <SignUp></SignUp>
        </div>
    );
};

export { Account };
