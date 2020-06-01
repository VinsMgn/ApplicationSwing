import { Sequelize, DataTypes } from "sequelize";
import { Model, BuildOptions } from "sequelize";
import { Models } from ".";

export interface ICamionAttributes {
  noimmatric: string;
  dateachat?: Date;
  modele: string;
  marque: string;
}
export class Camion extends Model<ICamionAttributes> {}

export default function (sequelize: Sequelize) {
  Camion.init(
    {
      noimmatric: {
        type: DataTypes.CHAR(10),
        allowNull: false,
        defaultValue: null,
        primaryKey: true,
        field: "noimmatric",
        autoIncrement: false,
      },
      dateachat: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        defaultValue: null,
        primaryKey: false,
        field: "dateachat",
        autoIncrement: false,
      },
      modele: {
        type: DataTypes.CHAR(50),
        allowNull: false,
        defaultValue: null,
        primaryKey: false,
        field: "modele",
        autoIncrement: false,
      },
      marque: {
        type: DataTypes.CHAR(50),
        allowNull: false,
        defaultValue: null,
        primaryKey: false,
        field: "marque",
        autoIncrement: false,
      },
    },
    {
      tableName: Models.Camion,
      modelName: Models.Camion,
      sequelize,
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );

  return Camion;
}
