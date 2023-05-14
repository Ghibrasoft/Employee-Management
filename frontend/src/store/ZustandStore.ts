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

type StoreTypes = {
  rows: DataTypes[];
  currentPage: number;
  totalPages: number;
  allEmployees: number;
  fetchData: (page: number, limit: number) => Promise<void>;
  setCurrentPage: (currentPage: number) => void;
  updateRow: (id: string, rows: DataTypes[]) => Promise<void>;
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
  setCurrentPage: (currentPage: number) => set({ currentPage }),
  updateRow: async (id: string, rows: DataTypes[]) => {
    try {
      // finding row to update
      const rowToUpdate = rows.find((row) => row.id === id);
      if (!rowToUpdate) {
        throw new Error(`Could not find employee with id ${id}`);
      }
      // making request to the server
      const updatedRow = await axios.put(
        `http://localhost:3001/Employees/${id}`,
        {
          status: rowToUpdate.status === "Active" ? "InActive" : "Active",
        }
      );
      // check if employee ID matches, a new obj is created with updated 'status', otherwise, the existing employee object is used
      const updateRows = rows.map((row) =>
        row.id === id ? { ...row, status: updatedRow.data.status } : row
      );
      // update rows array in the store obj with the new array of updated employee data
      set({ rows: updateRows });
    } catch (error) {
      console.log(error);
    }
  },
  searchEmployee: "",
  setSearchEmployee: (searchEmployee) => set({ searchEmployee }),
}));
