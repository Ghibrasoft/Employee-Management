import { AddEmployeeForm } from "./AddEmployeeForm";
import { UpdateEmployeeForm } from "./UpdateEmployeeForm";

export function EmployeeForm() {
    const flag = true;
    return (
        <div className="container mx-auto my-5">
            {
                flag ? <AddEmployeeForm /> : <UpdateEmployeeForm />
            }
        </div>
    )
}
