import { Sequelize, DataTypes, Model } from "sequelize";
import { Models } from ".";

export interface ITourneeAttributes {
  notournee: number;
  datetournee?: Date;
  noimmatric: string;
  noemploye: number;
}
export class Tournee extends Model<ITourneeAttributes> {}

export default function (sequelize: Sequelize) {
  Tournee.init(
    {
      notournee: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: null,
        primaryKey: true,
        field: "notournee",
        autoIncrement: false,
      },
      datetournee: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        defaultValue: null,
        primaryKey: false,
        field: "datetournee",
        autoIncrement: false,
      },
      noimmatric: {
        type: DataTypes.CHAR(10),
        allowNull: false,
        defaultValue: null,
        primaryKey: false,
        field: "noimmatric",
        autoIncrement: false,
        references: {
          key: "noimmatric",
          model: Models.Camion,
        },
      },
      noemploye: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: null,
        primaryKey: false,
        field: "noemploye",
        autoIncrement: false,
        references: {
          key: "noemploye",
          model: Models.Employe,
        },
      },
    },
    {
      tableName: Models.Tournee,
      modelName: Models.Tournee,
      sequelize,
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );

  return Tournee;
}
