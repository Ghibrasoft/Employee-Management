import { Link } from "react-router-dom";
import { useStore } from "../store/ZustandStore";

export default function Home() {
    const { logOutUSer } = useStore();

    return (
        <div className="flex flex-col flex-1 items-center justify-center gap-5">
            <h1 className="text-5xl">Welcome</h1>

            <div className="flex gap-5">
                <Link to={"/signup"}>
                    <button
                        className="px-3 py-1 rounded-md ring-2 ring-indigo-500 hover:bg-indigo-500 hover:ring-offset-2 hover:text-white active:ring-offset-4 transition ease-in-out">
                        Sign up
                    </button>
                </Link>
                <Link to={"/employees"}>
                    <button
                        onClick={logOutUSer}
                        className="px-3 py-1 rounded-md ring-2 ring-indigo-500 hover:bg-indigo-500 hover:ring-offset-2 hover:text-white active:ring-offset-4 transition ease-in-out">
                        As guest
                    </button>
                </Link>
            </div>
        </div>
    )
}
