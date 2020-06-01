import { Sequelize, DataTypes, Model } from "sequelize";
import { Models } from ".";

export interface IEmployeAttributes {
  noemploye: number;
  nom?: string;
  prenom?: string;
  datenaiss?: Date;
  dateembauche?: Date;
  salaire?: number;
  nofonction: number;
}
export class Employe extends Model<IEmployeAttributes> {}

export default function (sequelize: Sequelize) {
  Employe.init(
    {
      noemploye: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: null,
        primaryKey: true,
        field: "noemploye",
        autoIncrement: false,
      },
      nom: {
        type: DataTypes.CHAR(50),
        allowNull: true,
        defaultValue: null,
        primaryKey: false,
        field: "nom",
        autoIncrement: false,
      },
      prenom: {
        type: DataTypes.CHAR(50),
        allowNull: true,
        defaultValue: null,
        primaryKey: false,
        field: "prenom",
        autoIncrement: false,
      },
      datenaiss: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        defaultValue: null,
        primaryKey: false,
        field: "datenaiss",
        autoIncrement: false,
      },
      dateembauche: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        defaultValue: null,
        primaryKey: false,
        field: "dateembauche",
        autoIncrement: false,
      },
      salaire: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
        primaryKey: false,
        field: "salaire",
        autoIncrement: false,
      },
      nofonction: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: null,
        primaryKey: false,
        field: "nofonction",
        autoIncrement: false,
        references: {
          key: "nofonction",
          model: Models.Fonction,
        },
      },
    },
    {
      tableName: Models.Employe,
      modelName: Models.Employe,
      sequelize,
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );

  return Employe;
}
