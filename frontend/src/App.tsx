// import './App.css'
import { Table } from './components/Table';
import { useState } from 'react';
import { EmployeeForm } from './components/EmployeeForm';
import { SearchEmployee } from './components/SearchEmployee';
import { NavigationBar } from './components/NavigationBar';
import { AddEmployeeButton } from './components/AddEmployeeButton';

function App() {
  const [visible, setVisible] = useState(false);

  return (
    <section>
      <main className="mb-5">
        <NavigationBar />

        <div>
          {/* add employee button */}
          <div className='flex justify-between my-10'>
            <div className='ml-5'>
              <AddEmployeeButton visible={visible} setVisible={setVisible} />
            </div>
            <div className='mr-5'>
              <SearchEmployee />
            </div>
          </div>

          {/* form visibility */}
          {visible ? <EmployeeForm /> : <></>}

          {/* table */}
          <div className="container mx-auto mt-5 table-responsive">
            <Table />
          </div>
        </div>
      </main>
    </section>
  )
}

export default App;
