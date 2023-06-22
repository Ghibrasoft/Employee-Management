import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../store/ZustandStore";
import { SiGmail, SiGithub } from "react-icons/si";


export default function SignIn() {
    const navigate = useNavigate();
    const formRef = useRef(null);
    const { loginUSer, authenticated } = useStore();

    async function handleSignIn(e: React.FormEvent) {
        e.preventDefault();

        const formData = new FormData(formRef.current!)
        const userData = Object.fromEntries(formData);
        try {
            await loginUSer(userData)
        } catch (error) {
            console.log("Sign in", error);
        }
    }

    useEffect(() => {
        if (authenticated) {
            const loggedInUserId = localStorage.getItem("userId");
            navigate(`userprofile/${loggedInUserId}`);
        }
    }, [authenticated])
    return (
        <div className="flex flex-1 justify-center items-center">
            <div className="flex flex-col justify-center items-center border rounded-md px-16 py-24 gap-3 bg-gray-50 w-1/3" >
                <h1 className="text-3xl">
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

                    {/* horizontal divider */}
                    <div className="inline-flex items-center justify-center w-full">
                        <hr className="w-64 h-px my-3 bg-gray-300 border-0" />
                        <span className="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-gray-50 left-1/2">or</span>
                    </div>

                    {/* other sign in providers */}
                    <div className="flex flex-col gap-3 w-full">
                        <p className="flex justify-center items-center gap-1 px-3 py-1 rounded cursor-pointer text-indigo-500 bg-gray-200 hover:bg-gray-300 transition ease-in-out">
                            <span className="text-black"><SiGmail size={20} /></span>
                            Sign in with Google
                        </p>
                        <p className="flex justify-center items-center gap-1 px-3 py-1 rounded cursor-pointer text-indigo-500 bg-gray-200 hover:bg-gray-300 transition ease-in-out">
                            <span className="text-black"><SiGithub size={20} /></span>
                            Sign in with Github
                        </p>
                    </div>
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
