import { Sequelize, DataTypes, Model } from "sequelize";
import { Models } from ".";

export interface IDemandeAttributes {
  nodemande: number;
  datedemande?: Date;
  dateenlevement?: Date;
  web_o_n?: string;
  siret: number;
  notournee?: number;
}
export class Demande extends Model<IDemandeAttributes> {}

export default function (sequelize: Sequelize) {
  Demande.init(
    {
      nodemande: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: null,
        primaryKey: true,
        field: "nodemande",
        autoIncrement: false,
      },
      datedemande: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        defaultValue: null,
        primaryKey: false,
        field: "datedemande",
        autoIncrement: false,
      },
      dateenlevement: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        defaultValue: null,
        primaryKey: false,
        field: "dateenlevement",
        autoIncrement: false,
      },
      web_o_n: {
        type: DataTypes.CHAR(1),
        allowNull: true,
        defaultValue: null,
        primaryKey: false,
        field: "web_o_n",
        autoIncrement: false,
      },
      siret: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: null,
        primaryKey: false,
        field: "siret",
        autoIncrement: false,
        references: {
          key: "siret",
          model: Models.Entreprise,
        },
      },
      notournee: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
        primaryKey: false,
        field: "notournee",
        autoIncrement: false,
        references: {
          key: "notournee",
          model: Models.Tournee,
        },
      },
    },
    {
      tableName: Models.Demande,
      modelName: Models.Demande,
      sequelize,
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );

  return Demande;
}
