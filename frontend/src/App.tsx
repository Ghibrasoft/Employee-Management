// import './App.css'
import { Table } from './components/Table';
import { useState } from 'react';
import { EmployeeForm } from './components/EmployeeForm';
import { SearchEmployee } from './components/SearchEmployee';
import { AddEmployeeButton } from './components/AddEmployeeButton';

function App() {
  const [visible, setVisible] = useState(false);

  return (
    <main>
      {/* add employee button */}
      <div className='block justify-between my-10 md:flex'>
        <div className='ml-5 mb-5 md:mb-0'>
          <AddEmployeeButton visible={visible} setVisible={setVisible} />
        </div>
        <div className='ml-5 mt-5 md:mt-0 md:mr-5'>
          <SearchEmployee />
        </div>
      </div>

      {/* form visibility */}
      {visible ? <EmployeeForm /> : <></>}

      {/* table */}
      <div className="container mx-auto mt-5 table-responsive">
        <Table />
      </div>
    </main>
  )
}

export default App;
