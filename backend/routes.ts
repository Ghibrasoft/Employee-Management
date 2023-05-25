import { DataTypes, Sequelize } from "sequelize";
import { Express, Request, Response } from "express";

// connect database
const sequelize = new Sequelize("database", "username", "password", {
  define: {
    freezeTableName: true, // don't pluralize names (globally)
  },
  host: "localhost",
  dialect: "postgres",
});

// define users model
const Users = sequelize.define("Users", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// creates the table if it doesn't exist (and does nothing if it already exists)
// sequelize.sync();

export function initRoutes(app: Express) {
  // sign up
  app.post("/signup", (req: Request, res: Response) => {
    // code for registering a user
  });

  // sign in with username and password
  app.post("/signin", (req: Request, res: Response) => {
    // code for handling user login
  });

  // get user profile
  app.get("/profile/:userId", (req: Request, res: Response) => {
    // code for retrieving user profile
  });
}
