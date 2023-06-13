import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../store/ZustandStore";

export default function SignIn() {
    const formRef = useRef(null);
    const { loginUSer, authenticated, setAuthenticated } = useStore();

    async function handleSignIn(e: React.FormEvent) {
        e.preventDefault();

        const formData = new FormData(formRef.current!)
        const userData = Object.fromEntries(formData);
        try {
            await loginUSer(userData)
            setAuthenticated(true);

        } catch (error) {
            console.log("Sign in", error);
        }
    }

    useEffect(() => {
        if (authenticated) {
            // get userId from localstorage for manage navigate
        } else {

        }
    }, [authenticated])
    return (
        <div className="flex flex-1 justify-center items-center">
            <div className="flex flex-col justify-center items-center border rounded-md px-16 py-24 gap-3 bg-gray-50 w-1/3" >
                <h1>
                    Sign in
                </h1>
                <form
                    ref={formRef}
                    onSubmit={handleSignIn}
                    className="flex flex-col justify-center items-center gap-3">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email..."
                        className="border w-full py-3 px-5 focus:outline-none rounded-md shadow-sm" />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password..."
                        className="border w-full py-3 px-5 focus:outline-none rounded-md shadow-sm" />
                    <button
                        type="submit"
                        className="w-full px-3 py-1 rounded-sm text-white bg-indigo-500 ring-2 ring-indigo-500 
                        active:ring-offset-1
                        hover:ring-offset-2 hover:bg-indigo-700 hover:ring-indigo-700 transition ease-in-out">
                        Sign in
                    </button>
                </form>
                <div className="flex gap-2">
                    <p>Not have an account?</p>
                    <span className="text-indigo-500 hover:underline">
                        <Link to={"/signup"}>Sign up</Link>
                    </span>
                </div>
            </div>
        </div>
    )
}
