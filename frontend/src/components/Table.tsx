import { useEffect, useState } from 'react';
import { TablePagination } from './TablePagination';
import { useStore } from '../store/ZustandStore';
import { BiEdit, BiTrashAlt, BiCheck, BiX } from 'react-icons/bi';
import { ImProfile } from 'react-icons/im';
import { ConfirmModal } from './ConfirmModal';
import { TableHead } from './TableHead';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

type EditedRowTypes = {
    name: string;
    email: string;
    salary: number;
    birthday: string;
};

export function Table() {
    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editedRow, setEditedRow] = useState<EditedRowTypes>({
        name: "",
        email: "",
        salary: 0,
        birthday: ""
    });

    const [selectedId, setSelectedId] = useState("");
    const [employeeId, setEmployeeId] = useState("");
    const {
        rows,
        currentPage,
        totalPages,
        allEmployees,
        searchEmployee,
        getEmployee,
        setCurrentPage,
        updateEmployee,
        updateEmployeeStatus,
        deleteEmployee
    } = useStore();

    // updating status onclick
    function statusUpdateHandler(id: string) {
        updateEmployeeStatus(id, rows)
            .then(() => {
                getEmployee(currentPage, 20);
                toast.success("Employee status updated");
            })
            .catch((error) => {
                console.log(error);
            })
    }

    // update employee row
    function updateRowField(id: string) {
        updateEmployee(id, rows, editedRow)
            .then(() => {
                getEmployee(currentPage, 20);
                toast.success("Employee row updated");
            })
            .catch((error) => {
                console.log(error);
            })
    }

    // delete row 
    function rowDeleteHandler(id: string) {
        deleteEmployee(id, rows)
            .then(() => {
                getEmployee(currentPage, 20);
                toast.error("Employee deleted");
            })
            .catch((error) => {
                console.log(error);
            })
    }

    // Page changing
    function changeHandler(num: number) {
        setCurrentPage(num)
    }

    useEffect(() => {
        getEmployee(currentPage, 20)
    }, [currentPage, getEmployee]);

    return (
        <>
            <ToastContainer />
            <TablePagination
                currentPage={currentPage}
                totalPages={totalPages}
                allEmployees={allEmployees}
                changeHandler={changeHandler}
            />
            <div className='overflow-auto rounded-md shadow mt-1'>
                <table className='table-auto w-full'>
                    {/* table head */}
                    <thead>
                        <TableHead />
                    </thead>

                    {/* table body */}
                    <tbody className='bg-slate-100 divide-y divide-slate-300'>
                        {
                            rows.filter(({ name, email, salary, birthday, status }) =>
                                name.toLocaleLowerCase().includes(searchEmployee) ||
                                email.toLocaleLowerCase().includes(searchEmployee) ||
                                salary.toString().includes(searchEmployee) ||
                                birthday.toString().toLocaleLowerCase().includes(searchEmployee) ||
                                status.toLocaleLowerCase() === searchEmployee)
                                .map(({ id, avatar, name, email, salary, birthday, status }) => (
                                    <tr key={id} className='text-center hover:bg-white hover:shadow' onDoubleClick={() => navigate(`/employee/${id}`)}>
                                        <td className='flex items-center xl:ml-3 xl:gap-3 whitespace-wrap'>
                                            <img src={avatar} alt='avatar' className='w-10 h-10 rounded-full' />
                                            {editMode && selectedId === id ?
                                                <input
                                                    type='text'
                                                    className='border rounded-md shadow-sm py-1 px-3 outline-none focus:outline-none focus:shadow-lg transition-all'
                                                    defaultValue={name}
                                                    onChange={(e) => setEditedRow({ ...editedRow, name: e.target.value })} />
                                                :
                                                name}
                                        </td>
                                        <td className='whitespace-nowrap'>
                                            {editMode && selectedId === id ?
                                                <input
                                                    type='email'
                                                    className='border rounded-md shadow-sm py-1 px-3 outline-none focus:outline-none focus:shadow-lg transition-all'
                                                    defaultValue={email}
                                                    onChange={(e) => setEditedRow({ ...editedRow, email: e.target.value })} />
                                                :
                                                email}
                                        </td>
                                        <td className='whitespace-nowrap'>
                                            {editMode && selectedId === id ?
                                                <input
                                                    type='date'
                                                    className='border rounded-md shadow-sm py-1 px-3 outline-none focus:outline-none focus:shadow-lg transition-all'
                                                    defaultValue={birthday}
                                                    onChange={(e) => setEditedRow({ ...editedRow, birthday: e.target.value })} />
                                                :
                                                new Date(birthday).toLocaleDateString('en-US')}
                                        </td>
                                        <td className='whitespace-nowrap'>
                                            {editMode && selectedId === id ?
                                                <input
                                                    type='number'
                                                    className='border rounded-md shadow-sm py-1 px-3 outline-none focus:outline-none focus:shadow-lg transition-all'
                                                    defaultValue={salary}
                                                    onChange={(e) => setEditedRow({ ...editedRow, salary: Number(e.target.value) })} />
                                                :
                                                salary}
                                        </td>
                                        <td className='whitespace-nowrap'>
                                            <button
                                                className={`${status === "Active" ?
                                                    'bg-green-500 ring-2 ring-green-500 hover:ring-offset-2 active:ring-offset-1 transition ease-in-out'
                                                    :
                                                    'bg-red-500 ring-2 ring-red-500 hover:ring-offset-2 active:ring-offset-1 transition ease-in-out'} 
                                                text-white rounded-full px-3`}
                                                onClick={() => statusUpdateHandler(id)}
                                            >
                                                {status}
                                            </button>
                                        </td>
                                        <td className='text-gray-500 whitespace-nowrap'>
                                            {/* edit & done btns */}
                                            <div className='flex justify-center gap-3'>
                                                {
                                                    editMode && selectedId === id ?
                                                        <>
                                                            {/* update done btn and close btn */}
                                                            <button
                                                                className='hover:text-green-500 transition-all'
                                                                onClick={() => { setEditMode(false); updateRowField(id) }}>
                                                                <BiCheck size={30} />
                                                            </button>
                                                            <button
                                                                className='hover:text-red-500 transition-all'
                                                                onClick={() => { setEditMode(false) }}>
                                                                <BiX size={30} />
                                                            </button>
                                                        </>
                                                        :
                                                        <>
                                                            {/* edit btn & delete btn with confirmation modal */}
                                                            <button
                                                                className='hover:text-indigo-500 transition-all'
                                                                onClick={() => navigate(`/employee/${id}`)}
                                                            >
                                                                <ImProfile size={27} />
                                                            </button>
                                                            <button
                                                                className='hover:text-yellow-500 transition-all'
                                                                onClick={() => { setEditMode(true); setSelectedId(id) }}>
                                                                <BiEdit size={27} />
                                                            </button>
                                                            <button
                                                                className='hover:text-red-500 transition-all'
                                                                onClick={() => { setOpenModal(true); setEmployeeId(id) }}>
                                                                <BiTrashAlt size={27} />
                                                            </button>
                                                        </>
                                                }
                                            </div>
                                            {
                                                openModal &&
                                                <ConfirmModal
                                                    openModal={openModal}
                                                    setOpenModal={setOpenModal}
                                                    employeeId={employeeId}
                                                    rowDeleteHandler={rowDeleteHandler}
                                                />
                                            }
                                        </td>
                                    </tr>
                                ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}
