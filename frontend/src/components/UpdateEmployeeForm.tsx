import { BiPlus } from 'react-icons/bi';

export function UpdateEmployeeForm() {
    return (
        <form
            className='grid lg:grid-cols-2 w-4/6 gap-4 ml-5'
        // onSubmit={handleSubmit}
        >
            <div className='input-type'>
                <input
                    type='text'
                    name='firstname'
                    placeholder='Firstname...'
                    className='border w-full py-3 px-5 focus:outline-none rounded-md shadow-sm'
                // onChange={setFormData}
                />
            </div>
            <div className='input-type'>
                <input
                    type='text'
                    name='lastname'
                    placeholder='Lastname...'
                    className='border w-full py-3 px-5 focus:outline-none rounded-md shadow-sm'
                // onChange={setFormData}
                />
            </div>
            <div className='input-type'>
                <input
                    type='email'
                    name='email'
                    placeholder='Email...'
                    className='border w-full py-3 px-5 focus:outline-none rounded-md shadow-sm'
                // onChange={setFormData}
                />
            </div>
            <div className='input-type'>
                <input
                    type='text'
                    name='salary'
                    placeholder='Salary...'
                    className='border w-full py-3 px-5 focus:outline-none rounded-md shadow-sm'
                // onChange={setFormData}
                />
            </div>
            <div className='input-type'>
                <input
                    type='date'
                    name='date'
                    placeholder='Salary...'
                    className='border py-3 px-5 focus:outline-none rounded-md shadow-sm'
                // onChange={setFormData}
                />
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
                    // onChange={setFormData}
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
                    // onChange={setFormData}
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
    )
}
