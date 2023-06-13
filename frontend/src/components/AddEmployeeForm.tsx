import { useRef } from 'react';
import { BiPlus } from 'react-icons/bi';
import { useStore } from '../store/ZustandStore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function AddEmployeeForm() {
    const formRef = useRef<HTMLFormElement>(null);
    const { addEmployee, getEmployee, currentPage } = useStore();


    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const formData = new FormData(formRef.current!);
        const data = Object.fromEntries(formData.entries());
        await addEmployee(data)
        getEmployee(currentPage, 20);
        toast.success("Employee added successfully");
        formRef.current?.reset();
    }

    return (
        <>
            <ToastContainer />
            <form
                className='grid lg:grid-cols-2 w-4/6 gap-4 ml-5'
                ref={formRef}
                onSubmit={handleSubmit}
            >
                <div className='input-type'>
                    <input
                        type='text'
                        name='firstname'
                        placeholder='Firstname...'
                        className='border w-full py-3 px-5 focus:outline-none rounded-md shadow-sm'
                        required
                    />
                </div>
                <div className='input-type'>
                    <input
                        type='text'
                        name='lastname'
                        placeholder='Lastname...'
                        className='border w-full py-3 px-5 focus:outline-none rounded-md shadow-sm'
                        required
                    />
                </div>
                <div className='input-type'>
                    <input
                        type='email'
                        name='email'
                        placeholder='Email...'
                        className='border w-full py-3 px-5 focus:outline-none rounded-md shadow-sm'
                        required
                    />
                </div>
                <div className='input-type'>
                    <input
                        type='number'
                        min={1000}
                        max={3000}
                        name='salary'
                        placeholder='Salary(minmax 1000-3000)...'
                        className='border w-full py-3 px-5 focus:outline-none rounded-md shadow-sm'
                        required
                    />
                </div>
                <div className='input-type'>
                    <input
                        type='date'
                        name='birthday'
                        className='border py-3 px-5 focus:outline-none rounded-md shadow-sm'
                        required
                    />
                </div>
                <div className='input-type'>
                    <input
                        type='file'
                        name='avatar'
                        className='absolute inset-0 opacity-0 z-[-1]'
                    // className='border py-3 px-5 focus:outline-none rounded-md shadow-sm'
                    // required
                    />
                    <label
                        htmlFor='avatar'
                        className='py-2 px-4 bg-blue-500 text-white rounded cursor-pointer'>
                        Choose file
                    </label>
                </div>

                {/* radio buttons div */}
                <div className='flex gap-10 items-center'>
                    {/* active radio btn*/}
                    <div className='form-check'>
                        <input
                            type='radio'
                            name='status'
                            value='Active'
                            id='radioDefault1'
                            className='form-check-input appearance-none rounded-full h-4 w-4 
            border border-slate-300 bg-white checked:bg-green-500
            checked:border-green-500 focus:outline-none transition duration-200
            mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer'
                            required
                        />
                        <label
                            htmlFor='radioDefault1'
                            className='inline-block text-slate-800 cursor-pointer'
                        >
                            Active
                        </label>
                    </div>
                    {/* inactive radio btn*/}
                    <div className='form-check'>
                        <input
                            type='radio'
                            name='status'
                            value='Active'
                            id='radioDefault2'
                            className='form-check-input appearance-none rounded-full h-4 w-4 
            border border-slate-300 bg-white checked:bg-red-500
            checked:border-red-500 focus:outline-none transition duration-200
            mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer'
                            required
                        />
                        <label
                            htmlFor='radioDefault2'
                            className='inline-block text-slate-800 cursor-pointer'
                        >
                            Inactive
                        </label>
                    </div>
                    {/* add btn (submit) */}
                    <button
                        type='submit'
                        className='flex justify-center items-center text-md width-2/6 px-4 py-2
        text-green-500 rounded-full
        hover:bg-green-500 hover:text-white transition ease-out
        ring-green-500 ring-2 active:ring-offset-4'>
                        <span><BiPlus size={20} /></span>
                        Add
                    </button>
                </div>
            </form>
        </>
    )
}
