import { DataTypes, Model } from "sequelize";
import sequelize from "../database/sequelizeDB";

class Employees extends Model {
  public id!: number;
  public avatar!: string;
  public name!: string;
  public email!: string;
  public salary!: string;
  public birthday!: Date;
  public status!: string;
}

Employees.init(
  {
    id: {
      type: DataTypes.INTEGER,
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
  },
  {
    sequelize,
    modelName: "Employees",
  }
);

export default Employees;
