import './App.css'
import { Table } from './components/Table';
import { useState } from 'react';
import { FiUserPlus } from 'react-icons/fi';
import { EmployeeForm } from './components/EmployeeForm';

function App() {
  const [visible, setVisible] = useState(false);

  // toggle add employee button(form)
  function clickHandler() {
    setVisible(!visible);
  }

  return (
    <section>
      <main className="py-5">
        <h1 className="text-xl md:text-5xl text-center font-bold py-10 shadow-md">
          <span className="bg-indigo-500 text-white px-4 py-1 rounded-lg">E</span>mployee
          <span className="bg-green-500 text-white px-2 py-1 rounded-lg ml-5">M</span>anagement
        </h1>

        <div>
          {/* add employee button */}
          <div>
            <button
              className="flex items-center px-4 py-2 ml-5 mt-10 rounded-full text-white bg-indigo-500 ring-2 ring-indigo-500 
            active:ring-offset-2 shadow-slate-900 shadow-md
            hover:ring-offset-4 hover:bg-indigo-700 hover:ring-indigo-700 transition ease-in-out"
              onClick={clickHandler}
            >
              <span className="px-1"><FiUserPlus size={20} /></span>
              Add Employee
            </button>
          </div>

          {/* form visibility */}
          {visible ? <EmployeeForm /> : <></>}

          {/* table */}
          <div className="container mx-auto mt-5">
            <Table />
          </div>
        </div>
      </main>
    </section>
  )
}

export default App;
