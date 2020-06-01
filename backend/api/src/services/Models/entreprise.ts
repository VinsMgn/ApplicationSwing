import { Sequelize, DataTypes, Model } from "sequelize";
import { Models } from ".";

export interface IEntrepriseAttributes {
  siret: number;
  raisonsociale: string;
  norueentr?: number;
  rueentr?: string;
  cpostalentr?: number;
  villeentr?: string;
  notel?: string;
  contact?: string;
}
export class Entreprise extends Model {}

export default function (sequelize: Sequelize) {
  Entreprise.init(
    {
      siret: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: null,
        primaryKey: true,
        field: "siret",
        autoIncrement: false,
      },
      raisonsociale: {
        type: DataTypes.CHAR(50),
        allowNull: false,
        defaultValue: null,
        primaryKey: false,
        field: "raisonsociale",
        autoIncrement: false,
      },
      norueentr: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
        primaryKey: false,
        field: "norueentr",
        autoIncrement: false,
      },
      rueentr: {
        type: DataTypes.CHAR(200),
        allowNull: true,
        defaultValue: null,
        primaryKey: false,
        field: "rueentr",
        autoIncrement: false,
      },
      cpostalentr: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
        primaryKey: false,
        field: "cpostalentr",
        autoIncrement: false,
      },
      villeentr: {
        type: DataTypes.CHAR(50),
        allowNull: true,
        defaultValue: null,
        primaryKey: false,
        field: "villeentr",
        autoIncrement: false,
      },
      notel: {
        type: DataTypes.CHAR(10),
        allowNull: true,
        defaultValue: null,
        primaryKey: false,
        field: "notel",
        autoIncrement: false,
      },
      contact: {
        type: DataTypes.CHAR(50),
        allowNull: true,
        defaultValue: null,
        primaryKey: false,
        field: "contact",
        autoIncrement: false,
      },
    },
    {
      tableName: Models.Entreprise,
      modelName: Models.Entreprise,
      sequelize,
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );

  return Entreprise;
}
