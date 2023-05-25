import axios from "axios";
import { create } from "zustand";

type DataTypes = {
  id: string;
  avatar: string;
  name: string;
  email: string;
  salary: number;
  birthday: string;
  status: string;
};

type EditedRowTypes = {
  name: string;
  email: string;
  salary: number;
  birthday: string;
};

type FormDataType = {
  [k: string]: FormDataEntryValue;
};

type StoreTypes = {
  rows: DataTypes[];
  currentPage: number;
  totalPages: number;
  allEmployees: number;

  fetchData: (page: number, limit: number) => Promise<void>;
  addEmployee: (data: FormDataType) => Promise<void>;
  updateRow: (
    id: string,
    rows: DataTypes[],
    editedRow: EditedRowTypes
  ) => Promise<void>;
  updateRowStatus: (id: string, rows: DataTypes[]) => Promise<void>;
  deleteEmployee: (id: string, rows: DataTypes[]) => Promise<void>;

  setCurrentPage: (currentPage: number) => void;
  searchEmployee: string;
  setSearchEmployee: (searchEmployee: string) => void;
};

export const useStore = create<StoreTypes>((set) => ({
  rows: [],
  currentPage: 1,
  totalPages: 0,
  allEmployees: 0,
  fetchData: async (page = 1, limit = 20) => {
    try {
      const res = await axios.get("http://localhost:3001/Employees", {
        params: { page, limit },
      });
      const { rows, currentPage, totalPages, allEmployees } = res.data;
      set({
        rows,
        currentPage,
        totalPages,
        allEmployees,
      });
    } catch (error) {
      console.log(error);
    }
  },
  addEmployee: async (data: FormDataType) => {
    try {
      const { firstname, lastname, email, birthday, salary, status } = data;
      const fullName = `${firstname} ${lastname}`;

      await axios.post("http://localhost:3001/Employees", {
        name: fullName,
        email,
        salary,
        birthday,
        status,
      });
    } catch (error) {
      console.log(error);
    }
  },
  updateRow: async (
    id: string,
    rows: DataTypes[],
    editedRow: EditedRowTypes
  ) => {
    try {
      // finding row to update
      const rowToUpdateData = rows.find((row) => row.id === id);
      if (!rowToUpdateData) {
        throw new Error(`Could not find employee with id ${id}`);
      }

      // making request to the server
      const updatedData = await axios.put(
        `http://localhost:3001/Employees/${id}`,
        {
          name: editedRow.name,
          email: editedRow.email,
          salary: editedRow.salary,
          birthday: editedRow.birthday,
        }
      );

      // check if employee ID matches, a new obj is created with updated data, otherwise, the existing employee object is used
      const updatedRows = rows.map((row) =>
        row.id === id ? { ...row, ...updatedData.data } : row
      );

      // update rows array in the store object with the new array of updated employee data
      set({ rows: updatedRows });
    } catch (error) {
      console.log(error);
    }
  },
  updateRowStatus: async (id: string, rows: DataTypes[]) => {
    try {
      // finding row to update
      const rowToUpdateStatus = rows.find((row) => row.id === id);
      if (!rowToUpdateStatus) {
        throw new Error(`Could not find employee with id ${id}`);
      }
      // making request to the server
      const updatedStatus = await axios.put(
        `http://localhost:3001/Employees/${id}`,
        {
          status: rowToUpdateStatus.status === "Active" ? "Inactive" : "Active",
        }
      );
      // check if employee ID matches, a new obj is created with updated 'status', otherwise, the existing employee object is used
      const updateRows = rows.map((row) =>
        row.id === id ? { ...row, status: updatedStatus.data.status } : row
      );
      // update rows array in the store obj with the new array of updated employee data
      set({ rows: updateRows });
    } catch (error) {
      console.log(error);
    }
  },
  deleteEmployee: async (id, rows) => {
    try {
      await axios.delete(`http://localhost:3001/Employees/${id}`);
      const filteredRows = rows.filter((employee) => employee.id !== id);
      set({ rows: filteredRows });
    } catch (error) {
      console.log(error);
    }
  },
  setCurrentPage: (currentPage: number) => set({ currentPage }),
  searchEmployee: "",
  setSearchEmployee: (searchEmployee) => set({ searchEmployee }),
}));
