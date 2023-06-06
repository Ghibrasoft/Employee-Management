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
        <div className="flex justify-center items-center mt-10">
            <div className="bg-blue-100 w-1/3 rounded-lg p-10">
                <img src={avatar} alt="avatar" className="rounded-full" />
                <div>
                    <h1 className="text-2xl font-bold">{name}</h1>
                    <p>{email}</p>
                    <p>{salary}</p>
                    <p>{new Date(birthday).toLocaleDateString('en-US')}</p>
                </div>
            </div>
        </div>
    )
}
