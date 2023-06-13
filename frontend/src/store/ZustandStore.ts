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

type FormDataTypes = {
  [k: string]: FormDataEntryValue;
};

type StoreTypes = {
  // auth
  authenticated: boolean;
  setAuthenticated: (value: boolean) => void;
  loggedInUser: {
    username: string;
    email: string;
  };
  getLoggedInUSer: (id: string) => Promise<void>;
  registerUSer: (userData: FormDataTypes) => Promise<void>;
  loginUSer: (userData: FormDataTypes) => Promise<void>;
  logOutUSer: () => void;

  rows: DataTypes[];
  currentPage: number;
  totalPages: number;
  allEmployees: number;

  // employees
  getEmployee: (page: number, limit: number) => Promise<void>;
  getCurrEmployee: (id: string | undefined) => Promise<void>;
  currEmployee: {
    avatar: string;
    name: string;
    email: string;
    salary: number;
    birthday: string;
  };
  addEmployee: (data: FormDataTypes) => Promise<void>;
  updateEmployee: (
    id: string,
    rows: DataTypes[],
    editedRow: EditedRowTypes
  ) => Promise<void>;
  updateEmployeeStatus: (id: string, rows: DataTypes[]) => Promise<void>;
  deleteEmployee: (id: string, rows: DataTypes[]) => Promise<void>;

  setCurrentPage: (currentPage: number) => void;
  searchEmployee: string;
  setSearchEmployee: (searchEmployee: string) => void;
};

export const useStore = create<StoreTypes>((set) => ({
  // auth
  authenticated: false,
  setAuthenticated: (value: boolean) => set({ authenticated: value }),
  loggedInUser: {
    username: "",
    email: "",
  },
  getLoggedInUSer: async (id: string) => {
    try {
      const token = localStorage.getItem("jwt");
      if (!token) throw new Error("Zustand: User isn't authenticated");

      const res = await axios.get(`http://localhost:3001/profile/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set({ loggedInUser: res.data });
    } catch (error) {
      console.log("loggedInUser", error);
    }
  },
  registerUSer: async (userData) => {
    const { username, email, password } = userData;
    try {
      await axios.post("http://localhost:3001/signup", {
        username,
        email,
        password,
      });
    } catch (error) {
      console.log("Sign up zustand", error);
    }
  },
  loginUSer: async (userData) => {
    const { email, password } = userData;
    try {
      const res = await axios.post("http://localhost:3001/signin", {
        email,
        password,
      });

      if (res.status === 200) {
        const { id, token } = res.data;
        localStorage.setItem("userId", id);
        localStorage.setItem("jwt", token);
        set({ authenticated: true });
      } else {
        throw new Error("Invalid email or password");
      }
    } catch (error) {
      console.log("Sign in zustand", error);
      set({ authenticated: false });
    }
  },
  logOutUSer: () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("jwt");
    set({ authenticated: false });
  },

  // employees
  rows: [],
  currentPage: 1,
  totalPages: 0,
  allEmployees: 0,
  getEmployee: async (page = 1, limit = 20) => {
    try {
      const res = await axios.get("http://localhost:3001/employees", {
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
  currEmployee: {
    avatar: "",
    name: "",
    email: "",
    salary: 0,
    birthday: "",
  },
  getCurrEmployee: async (id: string | undefined) => {
    try {
      const res = await axios.get(`http://localhost:3001/employees/${id}`);
      set({ currEmployee: res.data });
    } catch (error) {
      console.log(error);
    }
  },
  addEmployee: async (data: FormDataTypes) => {
    try {
      const { firstname, lastname, email, birthday, salary, status } = data;
      const fullName = `${firstname} ${lastname}`;

      await axios.post("http://localhost:3001/employees", {
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
  updateEmployee: async (
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
        `http://localhost:3001/employees/${id}`,
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
  updateEmployeeStatus: async (id: string, rows: DataTypes[]) => {
    try {
      // finding row to update
      const rowToUpdateStatus = rows.find((row) => row.id === id);
      if (!rowToUpdateStatus) {
        throw new Error(`Could not find employee with id ${id}`);
      }
      // making request to the server
      const updatedStatus = await axios.put(
        `http://localhost:3001/employees/${id}`,
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
      await axios.delete(`http://localhost:3001/employees/${id}`);
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
