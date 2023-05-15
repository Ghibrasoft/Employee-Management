import { useEffect, useState } from 'react';
import { TablePagination } from './TablePagination';
import { useStore } from '../store/ZustandStore';
import { BiEdit, BiTrashAlt } from 'react-icons/bi';
import { ConfirmModal } from './ConfirmModal';


export function Table() {
    const [isOpen, setIsOpen] = useState(false);
    const [employeeId, setEmployeeId] = useState("");
    const {
        rows,
        currentPage,
        totalPages,
        allEmployees,
        searchEmployee,
        fetchData,
        setCurrentPage,
        updateRow,
        deleteEmployee
    } = useStore();

    // updating status onclick
    function statusUpdateHandler(id: string) {
        updateRow(id, rows)
            .then(() => {
                fetchData(currentPage, 20)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    // delete row 
    function rowDeleteHandler(id: string) {
        deleteEmployee(id, rows)
            .then(() => {
                fetchData(currentPage, 20)
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
        fetchData(currentPage, 20)
    }, [currentPage, fetchData]);

    return (
        <div>
            <table className='table-auto min-w-full'>
                {/* table head */}
                <thead>
                    <tr className='bg-slate-800'>
                        <th className='px-16 py-2'>
                            <span className='text-white'>Name</span>
                        </th>
                        <th className='px-16 py-2'>
                            <span className='text-white'>Email</span>
                        </th>
                        <th className='px-16 py-2'>
                            <span className='text-white'>Birthday</span>
                        </th>
                        <th className='px-16 py-2'>
                            <span className='text-white'>Salary (₾)</span>
                        </th>
                        <th className='px-16 py-2'>
                            <span className='text-white'>Status</span>
                        </th>
                        <th className='px-16 py-2'>
                            <span className='text-white'>Actions</span>
                        </th>
                    </tr>
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
                                <tr key={id} className='text-center'>
                                    <td className='px-16 py-2 flex flex-row items-center'>
                                        <img src={avatar} alt='avatar' className='w-10 h-10 rounded-full' />
                                        {name}
                                    </td>
                                    <td className='px-16 py-2'>{email}</td>
                                    <td className='px-16 py-2'>{new Date(birthday).toLocaleDateString('en-US')} </td>
                                    <td className='px-16 py-2'>{salary}</td>
                                    <td className='px-16 py-2'>
                                        <button
                                            className={`${status === "Active" ? 'bg-green-500' : 'bg-red-500'} text-white rounded-full px-3`}
                                            onClick={() => statusUpdateHandler(id)}
                                        >
                                            {status}
                                        </button>
                                    </td>
                                    <td className='px-16 py-2 text-gray-500'>
                                        {/* edit btn */}
                                        <button className='mr-3 hover:text-yellow-500 transition-all'><BiEdit size={25} /></button>
                                        {/* delete btn */}
                                        <button className='hover:text-red-500 transition-all' onClick={() => { setIsOpen(true); setEmployeeId(id) }}><BiTrashAlt size={25} /></button>
                                        {
                                            isOpen &&
                                            <ConfirmModal
                                                isOpen={isOpen}
                                                setIsOpen={setIsOpen}
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

            <TablePagination
                currentPage={currentPage}
                totalPages={totalPages}
                allEmployees={allEmployees}
                changeHandler={changeHandler}
            />
        </div>
    )
}
