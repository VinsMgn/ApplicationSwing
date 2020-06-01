import { Sequelize, DataTypes, Model } from "sequelize";
import { Models } from ".";

export interface ITypedechetAttributes {
  notypedechet: number;
  nomtypedechet?: string;
  niv_danger?: number;
}
export class TypeDechet extends Model<ITypedechetAttributes> {}

export default function (sequelize: Sequelize) {
  TypeDechet.init(
    {
      notypedechet: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: null,
        primaryKey: true,
        field: "notypedechet",
        autoIncrement: false,
      },
      nomtypedechet: {
        type: DataTypes.CHAR(50),
        allowNull: true,
        defaultValue: null,
        primaryKey: false,
        field: "nomtypedechet",
        autoIncrement: false,
      },
      niv_danger: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
        primaryKey: false,
        field: "niv_danger",
        autoIncrement: false,
      },
    },
    {
      tableName: Models.TypeDechet,
      modelName: Models.TypeDechet,
      sequelize,
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );

  return TypeDechet;
}
