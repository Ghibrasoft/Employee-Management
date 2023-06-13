import { Link, useNavigate } from "react-router-dom"
import { useStore } from "../store/ZustandStore";
import { RiLogoutBoxLine } from 'react-icons/ri'

export function NavigationBar() {
    const navigate = useNavigate();
    const { authenticated, logOutUSer } = useStore();

    function handleLogout() {
        logOutUSer();
        navigate("/");
    }
    return (
        <nav
            className="flex items-center justify-between h-full">
            <h1 className="text-xl md:text-5xl text-center font-bold cursor-pointer" onClick={() => navigate("/")}>
                <span className="bg-indigo-500 text-white px-4 py-1 rounded-lg">E</span>mployee
                <span className="bg-green-500 text-white px-2 py-1 rounded-lg ml-5">M</span>anagement
            </h1>
            <div className="flex gap-5">
                <Link to="/">
                    <button className="px-3 py-1 rounded-md hover:text-indigo-500 hover:ring hover:ring-indigo-500 active:bg-indigo-100 active:ring-offset-2 transition-all">
                        Home
                    </button>
                </Link>
                {
                    authenticated &&
                    <>
                        <Link to={`/userprofile/`}>
                            <button
                                className="px-3 py-1 rounded-md hover:text-indigo-500 hover:ring hover:ring-indigo-500 active:bg-indigo-100 active:ring-offset-2 transition-all">
                                Profile
                            </button>
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="flex items-center px-3 py-1 rounded-md hover:text-red-500 hover:ring hover:ring-red-500 active:bg-red-100 active:ring-offset-2 transition-all">
                            <RiLogoutBoxLine size={25} />
                            Log out
                        </button>
                    </>
                }

            </div>
        </nav >
    )
}
