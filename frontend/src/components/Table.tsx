import { useEffect } from 'react';
import { TablePagination } from './TablePagination';
import { useStore } from '../store/ZustandStore';
import { BiEdit, BiTrashAlt } from 'react-icons/bi';


export function Table() {
    const { rows, currentPage, totalPages, allEmployees, fetchData } = useStore();
    useEffect(() => {
        fetchData(currentPage, 20);
    }, [currentPage, fetchData]);
    return (
        <div>
            <table className='min-w-full table-auto'>
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
                <tbody className='bg-slate-100'>
                    {
                        rows.map(({ id, avatar, name, email, salary, birthday, status }) => (
                            <tr key={id} className='text-center'>
                                <td className='px-16 py-2 flex flex-row items-center'>
                                    <img src={avatar} alt='avatar' className='w-10 h-10 rounded-full' />
                                    {name}
                                </td>
                                <td className='px-16 py-2'>{email}</td>
                                <td className='px-16 py-2'>{birthday} </td>
                                <td className='px-16 py-2'>{salary}</td>
                                <td className='px-16 py-2'>
                                    <button
                                        className={`${status === "Active" ? 'bg-green-500' : 'bg-red-500'} text-white rounded-full px-3`}
                                    // onClick={toggleStatus}
                                    >
                                        {status}
                                    </button>
                                </td>
                                <td className='px-16 py-2 text-gray-500'>
                                    <button className='mr-3 hover:text-yellow-500'><BiEdit size={25} /></button>
                                    <button className='hover:text-red-500'><BiTrashAlt size={25} /></button>
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
            />
        </div>
    )
}
