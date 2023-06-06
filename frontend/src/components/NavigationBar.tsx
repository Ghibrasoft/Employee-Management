import { useNavigate } from "react-router-dom"

export function NavigationBar() {
    const navigate = useNavigate();
    return (
        <nav className="h-16 bg-white shadow-md sticky top-0 flex justify-center items-center p-10">
            <h1 className="text-xl md:text-5xl text-center font-bold cursor-pointer" onClick={() => navigate("/")}>
                <span className="bg-indigo-500 text-white px-4 py-1 rounded-lg">E</span>mployee
                <span className="bg-green-500 text-white px-2 py-1 rounded-lg ml-5">M</span>anagement
            </h1>
        </nav>
    )
}
