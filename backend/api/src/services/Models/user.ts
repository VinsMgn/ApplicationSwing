import { Model, DataTypes, Sequelize } from "sequelize";
import { Models } from "./index";

export class User extends Model {}

export default (sequelize: Sequelize) => {
  User.init(
    {
      uuid: {
        primaryKey: true,
        type: DataTypes.STRING(30),
      },
    },
    {
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
      modelName: Models.User,
      sequelize,
      tableName: Models.User,
    }
  );

  return User;
};
