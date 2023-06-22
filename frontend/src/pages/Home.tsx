import { useNavigate } from "react-router-dom";
import { RiArrowRightLine } from "react-icons/ri";

export default function Home() {
    const navigate = useNavigate();

    return (
        <main className="home-page flex flex-col flex-1 items-center justify-center gap-5">
            <h1 className="text-7xl">Welcome</h1>

            <button
                onClick={() => navigate("/signin")}
                className="group flex items-center text-2xl rounded-full px-4 py-2 hover:ring-2 hover:ring-indigo-500 hover:text-indigo-500 active:bg-indigo-100 active:ring-offset-2 transition-all duration-300">
                Get started
                <span className="text-indigo-500 opacity-0 -translate-x-5 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
                    <RiArrowRightLine size={25} />
                </span>
            </button>
        </main>
    )
}
