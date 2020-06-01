import { Sequelize, DataTypes, Model } from "sequelize";
import { Models } from ".";

export interface IDetailDepotAttributes {
  quantitedeposee: number;
  notournee: number;
  notypedechet: number;
  nocentre: number;
}
export class DetailDepot extends Model<IDetailDepotAttributes> {}

export default function (sequelize: Sequelize) {
  DetailDepot.init(
    {
      quantitedeposee: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: null,
        primaryKey: false,
        field: "quantitedeposee",
        autoIncrement: false,
      },
      notournee: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: null,
        primaryKey: true,
        field: "notournee",
        autoIncrement: false,
        references: {
          key: "notournee",
          model: Models.Tournee,
        },
      },
      notypedechet: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: null,
        primaryKey: true,
        field: "notypedechet",
        autoIncrement: false,
        references: {
          key: "notypedechet",
          model: Models.TypeDechet,
        },
      },
      nocentre: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: null,
        primaryKey: true,
        field: "nocentre",
        autoIncrement: false,
        references: {
          key: "nocentre",
          model: Models.CentreTraitement,
        },
      },
    },
    {
      tableName: Models.DetailDepot,
      modelName: Models.DetailDepot,
      sequelize,
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );

  return DetailDepot;
}
