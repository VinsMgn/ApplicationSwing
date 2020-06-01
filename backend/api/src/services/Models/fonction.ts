import { Sequelize, DataTypes, Model } from "sequelize";
import { Models } from ".";

export interface IFonctionAttributes {
  nofonction: number;
  nomfonction: string;
}
export class Fonction extends Model<IFonctionAttributes> {}

export default function (sequelize: Sequelize) {
  Fonction.init(
    {
      nofonction: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: null,
        primaryKey: true,
        field: "nofonction",
        autoIncrement: false,
      },
      nomfonction: {
        type: DataTypes.CHAR(50),
        allowNull: false,
        defaultValue: null,
        primaryKey: false,
        field: "nomfonction",
        autoIncrement: false,
      },
    },
    {
      tableName: Models.Fonction,
      modelName: Models.Fonction,
      sequelize,
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  return Fonction;
}
