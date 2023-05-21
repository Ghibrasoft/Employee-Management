export function TableHead() {
    return (
        <tr className='bg-slate-800'>
            <th className='px-16 py-2 whitespace-nowrap'>
                <span className='text-white'>Name</span>
            </th>
            <th className='px-16 py-2 whitespace-nowrap'>
                <span className='text-white'>Email</span>
            </th>
            <th className='px-16 py-2 whitespace-nowrap'>
                <span className='text-white'>Birthday</span>
            </th>
            <th className='px-16 py-2 whitespace-nowrap'>
                <span className='text-white'>Salary</span>
            </th>
            <th className='px-16 py-2 whitespace-nowrap'>
                <span className='text-white'>Status</span>
            </th>
            <th className='px-16 py-2 whitespace-nowrap'>
                <span className='text-white'>Actions</span>
            </th>
        </tr>
    )
}
