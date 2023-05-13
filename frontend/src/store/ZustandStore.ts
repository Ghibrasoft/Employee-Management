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
}));
