import { FiUserPlus } from 'react-icons/fi';
import { useStore } from '../store/ZustandStore';

type HandlerPropsType = {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
export function AddEmployeeButton({ visible, setVisible }: HandlerPropsType) {
    const { authenticated } = useStore();

    return (
        <button
            disabled={!authenticated}
            className={`group relative flex items-center px-4 py-2 rounded-full text-white
            shadow-slate-900 shadow-md transition ease-in-out 
            ${authenticated ? "hover:ring-offset-4 hover:bg-indigo-700 hover:ring-indigo-700 active:ring-offset-2 bg-indigo-500 ring-2 ring-indigo-500" : "bg-indigo-400 ring-2 ring-indigo-400"}`}
            onClick={() => setVisible(!visible)}
        >
            <span className="px-1"><FiUserPlus size={20} /></span>
            {!authenticated &&
                <span className="absolute bg-gray-500 w-full px-2 rounded-full scale-0 -top-8 right-1/2 translate-x-1/2 group-hover:scale-100 transition-transform">
                    Sign in first
                </span>
            }
            Add Employee
        </button>
    )
}
