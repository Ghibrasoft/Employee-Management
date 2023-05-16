import { FiUserPlus } from 'react-icons/fi';

type HandlerPropsType = {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
export function AddEmployeeButton({ visible, setVisible }: HandlerPropsType) {
    return (
        <button
            className="flex items-center px-4 py-2 rounded-full text-white bg-indigo-500 ring-2 ring-indigo-500 
  active:ring-offset-2 shadow-slate-900 shadow-md
  hover:ring-offset-4 hover:bg-indigo-700 hover:ring-indigo-700 transition ease-in-out"
            onClick={() => setVisible(!visible)}
        >
            <span className="px-1"><FiUserPlus size={20} /></span>
            Add Employee
        </button>
    )
}
