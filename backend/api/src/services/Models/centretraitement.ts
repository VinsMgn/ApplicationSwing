import { Sequelize, DataTypes, Model } from "sequelize";
import { Models } from ".";

export interface ICentretraitementAttributes {
  nocentre: number;
  nomcentre?: string;
  noruecentre?: number;
  ruecentre?: string;
  cpostalcentre?: number;
  villecentre?: string;
}
export class Centretraitement extends Model<ICentretraitementAttributes> {}

export default function (sequelize: Sequelize) {
  Centretraitement.init(
    {
      nocentre: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: null,
        primaryKey: true,
        field: "nocentre",
        autoIncrement: false,
      },
      nomcentre: {
        type: DataTypes.CHAR(100),
        allowNull: true,
        defaultValue: null,
        primaryKey: false,
        field: "nomcentre",
        autoIncrement: false,
      },
      noruecentre: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
        primaryKey: false,
        field: "noruecentre",
        autoIncrement: false,
      },
      ruecentre: {
        type: DataTypes.CHAR(200),
        allowNull: true,
        defaultValue: null,
        primaryKey: false,
        field: "ruecentre",
        autoIncrement: false,
      },
      cpostalcentre: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
        primaryKey: false,
        field: "cpostalcentre",
        autoIncrement: false,
      },
      villecentre: {
        type: DataTypes.CHAR(50),
        allowNull: true,
        defaultValue: null,
        primaryKey: false,
        field: "villecentre",
        autoIncrement: false,
      },
    },
    {
      tableName: Models.CentreTraitement,
      modelName: Models.CentreTraitement,
      sequelize,
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );

  return Centretraitement;
}
