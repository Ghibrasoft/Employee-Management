import { useParams } from "react-router-dom";
import { useStore } from "../store/ZustandStore";
import { useEffect } from "react";


export function EmployeeProfile() {
    const { id } = useParams();
    const { currEmployee, getCurrEmployee } = useStore();
    const { avatar, name, email, salary, birthday } = currEmployee;

    useEffect(() => {
        getCurrEmployee(id);
    }, []);

    return (
        <>
            <h1 className="text-center text-3xl font-bold mt-10">Employee profile</h1>
            <div className="flex flex-grow justify-center items-center">
                <div className="bg-gray-50 w-1/3 rounded-lg p-10 border shadow-md hover:shadow-lg transition-shadow">
                    <img src={avatar} alt="avatar" className="rounded-full" />
                    <div className="mt-3">
                        <h1 className="text-2xl font-bold border-indigo-400 border-b-4">{name}</h1>
                        <p className="font-bold mt-3">Email:<span className="ml-3 font-normal text-indigo-500 hover:cursor-pointer hover:underline">{email}</span></p>
                        <p className="font-bold">Salary:<span className="ml-3 font-normal text-indigo-500">{salary.toLocaleString()} ₾</span></p>
                        <p className="font-bold">Birthday:<span className="ml-3 font-normal text-indigo-500">{new Date(birthday).toLocaleDateString('en-US')}</span></p>
                    </div>
                </div>
            </div>
        </>
    )
}
