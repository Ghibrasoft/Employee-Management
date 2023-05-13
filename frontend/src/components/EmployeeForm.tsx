import { AddUserForm } from "./AddUserForm";
import { UpdateUserForm } from "./UpdateUserForm";

export function EmployeeForm() {
    const flag = true;
    return (
        <div className="container mx-auto my-5">
            {
                flag ? <AddUserForm /> : <UpdateUserForm />
            }
        </div>
    )
}
