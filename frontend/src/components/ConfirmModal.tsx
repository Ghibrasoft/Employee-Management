import { BiTrashAlt } from 'react-icons/bi';

type ModalPropTypes = {
    openModal: boolean;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    employeeId: string;
    rowDeleteHandler: (id: string) => void;
}

export function ConfirmModal({ openModal, setOpenModal, employeeId, rowDeleteHandler }: ModalPropTypes) {

    return (
        // backdrop
        <div
            className={`fixed inset-0 flex justify-center items-center transition-colors ${openModal ? 'visible bg-black/5' : 'invisible'}`}
            onClick={() => setOpenModal(false)}>
            {/* modal */}
            <div
                onClick={(e) => e.stopPropagation()}
                className={`bg-white rounded-xl shadow p-6 transition-all ${openModal ? 'scale-100 opacity-100' : 'scale-125 opacity-0'}`}>
                {/* modal body */}
                <div className='text-center w-56'>
                    <BiTrashAlt size={50} className='mx-auto text-red-500' />
                    <div className='mx-auto m-4 w-48'>
                        <h3 className='text-lg font-extrabold text-gray-800'>Confirm delete</h3>
                        <p className='text-sm text-gray-500'>Are you sure you want to delete this employee?</p>
                    </div>

                    <div className='flex gap-4'>
                        <button
                            className='bg-red-500 rounded-lg px-4 py-2 text-white w-full hover:bg-red-700'
                            onClick={() => { rowDeleteHandler(employeeId); setOpenModal(false) }}>
                            Delete
                        </button>
                        <button
                            className='bg-gray-500 rounded-lg px-4 py-2 text-white w-full hover:bg-gray-700'
                            onClick={() => setOpenModal(false)}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
