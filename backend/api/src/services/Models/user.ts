import { Sequelize, DataTypes, Model } from "sequelize";
import { Models } from ".";

export interface IUserAttributes {
  uuid: string;
  createdAt: Date;
  updatedAt: Date;
}
export class User extends Model<IUserAttributes> {}

export default function (sequelize: Sequelize) {
  User.init(
    {
      uuid: {
        type: DataTypes.CHAR(30),
        allowNull: false,
        defaultValue: null,
        primaryKey: true,
        field: "uuid",
        autoIncrement: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: null,
        primaryKey: false,
        field: "createdAt",
        autoIncrement: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: null,
        primaryKey: false,
        field: "updatedAt",
        autoIncrement: false,
      },
    },
    {
      tableName: Models.User,
      modelName: Models.User,
      sequelize,
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );

  return User;
}
