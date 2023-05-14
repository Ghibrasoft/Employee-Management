import express, { Request, Response } from "express";
import { Express } from "express";
import cors from "cors";
import Chance from "chance";
import { Sequelize, DataTypes } from "sequelize";
import dotenv from "dotenv";

dotenv.config();
const chance = new Chance();

const LOCALHOST_VITE_URL = "http://localhost:5174";
const app: Express = express();
app.use(express.json());
app.use(cors({ origin: LOCALHOST_VITE_URL }));

// passing connection URL
const sequelize = new Sequelize(process.env.CONN_POSTG_URL || "", {
  define: {
    freezeTableName: true, // don't pluralize names (globally)
  },
});

// creating a model
const Employees = sequelize.define("Employees", {
  id: {
    type: DataTypes.UUID,
    autoIncrement: true,
    primaryKey: true,
  },
  avatar: {
    type: DataTypes.STRING,
  },
  name: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  salary: {
    type: DataTypes.INTEGER,
  },
  birthday: {
    type: DataTypes.DATE,
  },
  status: {
    type: DataTypes.STRING,
  },
});

// Creates the table if it doesn't exist (and does nothing if it already exists)
async function addModel() {
  await Employees.sync();
  console.log("Database sync success!");
}
addModel();

// generate random employees
// const status = ["Active", "Inactive"];
// function addEmployees() {
//   for (let i = 1; i <= 15; i++) {
//     const newEmployee = Employees.build({
//       avatar: chance.avatar(),
//       name: chance.name(),
//       email: chance.email(),
//       salary: chance.integer({min: 700, max: 3000}),
//       birthday: chance.birthday(),
//       status: chance.pickone(status)
//     });
//     newEmployee.save();
//   }
// }
// addEmployees();

// GET all employees
app.get("/Employees", async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const limit = 20;
  const offset = (page - 1) * limit;

  const { count, rows } = await Employees.findAndCountAll({
    limit,
    offset,
    order: [
      ["name", "ASC"],
      ["salary", "DESC"],
    ],
  });

  const allEmployees = await Employees.findAll();
  const data = {
    rows,
    currentPage: page,
    totalPages: Math.ceil(count / limit),
    allEmployees: allEmployees.length,
  };
  res.json(data);
});

// POST
app.post("/Employees", async (req: Request, res: Response) => {
  const { avatar, name, email, birthday, salary, status } = req.body;
  const newEmployee = await Employees.create({
    avatar,
    name,
    email,
    birthday,
    salary,
    status,
  });
  res.json(newEmployee);
  console.log("New employee added successfully");
});

// PUT
app.put("/Employees/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const [numAffectedRows] = await Employees.update(
      { status: status },
      { where: { id } }
    );

    if (numAffectedRows === 0) {
      return res
        .status(404)
        .json({ message: `Employee with ID ${id} not found` });
    }

    res.json({ message: `Employee with ID ${id} updated successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// DELETE
app.delete("/Employees/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const deleteEmployee = await Employees.destroy({ where: { id } });

  if (deleteEmployee > 0) {
    res.json({ messsage: "Employee deleted" });
  } else {
    res.status(404).json({ error: "Employee not found" });
  }
});

// listening a server
const port = process.env.PORT || 4321;
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
// module.exports = Employees;   // it can be imported and used by other modules in your application
