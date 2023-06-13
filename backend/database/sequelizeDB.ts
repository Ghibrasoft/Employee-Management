import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();
const sequelize = new Sequelize({
  dialect: "postgres",
  host: process.env.host,
  database: process.env.dbname,
  port: Number(process.env.portPG),
  username: process.env.user,
  password: process.env.password,
  define: {
    freezeTableName: true,
  },
});

export default sequelize;
