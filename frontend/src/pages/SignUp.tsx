import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useRef, useState } from "react";
import { useStore } from "../store/ZustandStore";

export default function SignUp() {
    const formRef = useRef(null);
    const [showPassword, setShowPassword] = useState(false);
    const { registerUSer } = useStore();

    async function handleSignUp(e: React.FormEvent) {
        e.preventDefault();

        const formData = new FormData(formRef.current!)
        const userData = Object.fromEntries(formData);
        try {
            await registerUSer(userData)
            // formRef.current?.reset();
        } catch (error) {
            console.log("SignUp", error);
        }

    }
    return (
        <div className="flex flex-1 justify-center items-center">
            <div className="flex flex-col justify-center items-center border rounded-md px-16 py-24 gap-3 bg-gray-50 w-1/3" >
                <h1>
                    Sign up
                </h1>
                <form
                    ref={formRef}
                    onSubmit={handleSignUp}
                    className="flex flex-col justify-center items-center gap-3">
                    <input
                        type="text"
                        name="username"
                        placeholder="Username..."
                        className="border w-full py-3 px-5 focus:outline-none rounded-md shadow-sm" />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email..."
                        className="border w-full py-3 px-5 focus:outline-none rounded-md shadow-sm" />
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password..."
                            className="border w-full py-3 px-5 focus:outline-none rounded-md shadow-sm" />
                        <span className="absolute right-0 top-1/4 mr-2 text-gray-300 hover:text-indigo-500 cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}>
                            {
                                showPassword ?
                                    <FaEyeSlash size={20} />
                                    :
                                    <FaEye size={20} />
                            }
                        </span>
                    </div>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="confPassword"
                            placeholder="Confirm password..."
                            className="border w-full py-3 px-5 focus:outline-none rounded-md shadow-sm" />
                        <span className="absolute right-0 top-1/4 mr-2 text-gray-300 hover:text-indigo-500 cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}>
                            {
                                showPassword ?
                                    <FaEyeSlash size={20} />
                                    :
                                    <FaEye size={20} />
                            }
                        </span>
                    </div>
                    <button
                        type="submit"
                        className="w-full px-3 py-1 rounded-sm text-white bg-indigo-500 ring-2 ring-indigo-500 
                        active:ring-offset-1
                        hover:ring-offset-2 hover:bg-indigo-700 hover:ring-indigo-700 transition ease-in-out">
                        Sign up
                    </button>
                </form>
                <div className="flex gap-2">
                    <p>Already have an account?</p>
                    <span className="text-indigo-500 hover:underline">
                        <Link to={"/signin"}>Sign in</Link>
                    </span>
                </div>
            </div>
        </div>
    )
}
