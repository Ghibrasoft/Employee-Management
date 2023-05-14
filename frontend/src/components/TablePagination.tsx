import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md';


type PaginationProps = {
    currentPage: number;
    totalPages: number;
    allEmployees: number;
    changeHandler: (num: number) => void;
}

export function TablePagination({ currentPage, totalPages, allEmployees, changeHandler }: PaginationProps) {
    return (
        <div className="flex flex-col items-center">
            <span className="text-sm text-gray-700">
                Showing page <span className="font-semibold text-gray-900">{currentPage}</span> / <span className="font-semibold text-gray-900">{totalPages}</span> of <span className="font-semibold text-gray-900">{allEmployees}</span> total
            </span>

            <div className="inline-flex mt-2 xs:mt-0">
                <button
                    disabled={currentPage === 1}
                    className={`${currentPage === 1 ? 'bg-indigo-300' : 'bg-indigo-500 hover:bg-indigo-700 group'} flex justify-center items-center px-4 py-2 text-sm font-medium text-white rounded-l transition-all`}
                    onClick={() => changeHandler(Math.max(currentPage - 1, 1))}
                >
                    <span className='text-white opacity-0 group-hover:opacity-100 transition-opacity'><MdNavigateBefore size={23} /></span>Prev
                </button>
                <button
                    disabled={currentPage === totalPages}
                    className={`${currentPage === totalPages ? 'bg-indigo-300' : 'bg-indigo-500 hover:bg-indigo-700 group'} flex justify-center items-center px-4 py-2 text-sm font-medium text-white rounded-r transition-all`}
                    onClick={() => changeHandler(Math.min(currentPage + 1, totalPages))}
                >
                    Next<span className='text-white opacity-0 group-hover:opacity-100 transition-opacity'><MdNavigateNext size={23} /></span>
                </button>
                {/* must fix multiple clicks, on click must disable button while changing page */}
            </div>
        </div>
    )
}
