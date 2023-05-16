import { useNavigate } from "react-router-dom"

export function NavigationBar() {
    const navigate = useNavigate();
    return (
        <nav className="py-10 shadow-md">
            <h1 className="text-xl md:text-5xl text-center font-bold cursor-pointer bg-indigo-100" onClick={() => navigate("/")}>
                <span className="bg-indigo-500 text-white px-4 py-1 rounded-lg">E</span>mployee
                <span className="bg-green-500 text-white px-2 py-1 rounded-lg ml-5">M</span>anagement
            </h1>
        </nav>
    )
}
