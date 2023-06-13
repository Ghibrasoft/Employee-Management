import express, { Request, Response } from "express";
import { Express } from "express";
import cors from "cors";
import Chance from "chance";
import dotenv from "dotenv";
import Employees from "./models/Employees";
import Users from "./models/Users";
import authRoutes from "./routes/authRoutes";

dotenv.config();
const chance = new Chance();

const LOCALHOST_VITE_URL = "http://localhost:5173";
const app: Express = express();
app.use(express.json());
app.use(cors({ origin: LOCALHOST_VITE_URL }));
app.use(authRoutes);

// passing connection URL, from railway.app
// const sequelize = new Sequelize(process.env.CONN_POSTG_URL || "", {
//   define: {
//     freezeTableName: true, // don't pluralize names (globally)
//   },
// });

// creates the table if it doesn't exist (and does nothing if it already exists)
async function addModel() {
  await Employees.sync();
  await Users.sync();
  console.log("Database sync success!");
}
addModel();

// generate random employees
const status = ["Active", "Inactive"];
function addEmployees() {
  for (let i = 1; i <= 20; i++) {
    const newEmployee = Employees.build({
      avatar: chance.avatar(),
      name: chance.name(),
      email: chance.email(),
      salary: chance.integer({ min: 1000, max: 3000 }),
      birthday: chance.birthday(),
      status: chance.pickone(status),
    });
    newEmployee.save();
  }
}
// addEmployees();

// GET all users
app.get("/users", async (req: Request, res: Response) => {
  try {
    const allUsers = await Users.findAll();
    res.json(allUsers);
  } catch (error) {
    console.log("Users get", error);
    res.status(500).json({ Error: "Internal server error" });
  }
});

// GET all employees
app.get("/employees", async (req: Request, res: Response) => {
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

// GET concret employee
app.get("/employees/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const currEmployee = await Employees.findOne({
      where: { id },
    });

    if (currEmployee) {
      res.json(currEmployee);
    } else {
      res.status(404).json({ message: "Employee not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// POST
app.post("/employees", async (req: Request, res: Response) => {
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
app.put("/employees/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, salary, birthday, status } = req.body;

  try {
    const updatedFields: any = {
      ...(name && { name }),
      ...(email && { email }),
      ...(salary && { salary }),
      ...(birthday && { birthday }),
      ...(status && { status }),
    };

    const [numAffectedRows] = await Employees.update(updatedFields, {
      where: { id },
    });

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
app.delete("/employees/:id", async (req: Request, res: Response) => {
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
