import { DataTypes, Model } from "sequelize";
import sequelize from "../database/sequelizeDB";

class Users extends Model {
  public id!: string;
  public username!: string;
  public email!: string;
  public password!: string;
  public confPassword!: string;
}

Users.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    confPassword: {
      type: DataTypes.VIRTUAL, // for validation only, not stored in the db
    },
  },
  {
    sequelize,
    modelName: "Users",
  }
);

export default Users;
