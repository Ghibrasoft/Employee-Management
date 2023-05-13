type PaginationProps = {
    currentPage: number;
    totalPages: number;
    allEmployees: number;
}

export function TablePagination({ currentPage, totalPages, allEmployees }: PaginationProps) {
    return (
        <div className="flex flex-col items-center">
            <span className="text-sm text-gray-700">
                Showing <span className="font-semibold text-gray-900">{currentPage}</span> to <span className="font-semibold text-gray-900">{totalPages}</span> of <span className="font-semibold text-gray-900">{allEmployees}</span> Entries
            </span>

            <div className="inline-flex mt-2 xs:mt-0">
                <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-500 rounded-l hover:bg-indigo-700">
                    Prev
                </button>
                <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-500 rounded-r hover:bg-indigo-700">
                    Next
                </button>
            </div>
        </div>
    )
}
