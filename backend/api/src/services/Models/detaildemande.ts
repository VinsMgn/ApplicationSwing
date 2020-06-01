import { Sequelize, DataTypes, Model } from "sequelize";
import { Models } from ".";

export interface IDetaildemandeAttributes {
  quantiteenlevee: number;
  remarque?: string;
  nodemande: number;
  notypedechet: number;
}
export class Detaildemande extends Model<IDetaildemandeAttributes> {}

export default function (sequelize: Sequelize) {
  Detaildemande.init(
    {
      quantiteenlevee: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: null,
        primaryKey: false,
        field: "quantiteenlevee",
        autoIncrement: false,
      },
      remarque: {
        type: DataTypes.CHAR(100),
        allowNull: true,
        defaultValue: null,
        primaryKey: false,
        field: "remarque",
        autoIncrement: false,
      },
      nodemande: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: null,
        primaryKey: true,
        field: "nodemande",
        autoIncrement: false,
        references: {
          key: "nodemande",
          model: Models.Demande,
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
    },
    {
      tableName: Models.DetailDemande,
      modelName: Models.DetailDemande,
      sequelize,
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );

  return Detaildemande;
}
