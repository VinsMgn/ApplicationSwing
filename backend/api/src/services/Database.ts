import fs from "fs";
import path from "path";
import { BaseService } from "./Base";
import cls from "cls-hooked";
import { Sequelize, Op, Model, Options } from "sequelize";
import { ServiceContainer } from "@services/";
import { User } from "./Models/user";

// used to automate transaction propagation:
// https://sequelize.org/master/manual/transactions.html#automatically-pass-transactions-to-all-queries
Sequelize.useCLS(cls.createNamespace("sequelize"));

interface Models {
  User: typeof User;
}

/**
 * @class Db
 * @extends BaseService
 * @property {Sequelize} client
 * @property {Models} models
 */
export class DataBase extends BaseService {
  client: Sequelize | undefined;
  models!: Models;

  constructor(app: ServiceContainer) {
    super(app);

    /**
     * @type Models
     */

    // @ts-ignore
    this.models = {};
  }

  static get Op() {
    return Op;
  }

  init() {
    const options: Options = {
      dialect: "mysql",
      host: this.config.db.host,
    };

    this.client = new Sequelize(
      this.config.db.name,
      this.config.db.user,
      this.config.db.password,
      options
    );

    this._initModels();
  }

  _initModels() {
    const files = fs
      .readdirSync(__dirname + "/Models")
      .filter(
        (file) =>
          (file.endsWith(".js") && file !== "index.js") ||
          (file.endsWith(".ts") && file !== "index.ts")
      );

    for (const file of files) {
      const model = this.client!.import(path.join(__dirname, "Models", file));
      // @ts-ignore
      this.models[model.name] = model;
    }
  }

  async asyncInit() {
    // await this.client.drop();
    for (const model of Object.keys(this.models)) {
      await this.models[model as keyof Models].sync({ force: true });
    }
    for (const [, model] of Object.entries(this.models)) {
      if (model.associate) {
        model.associate(this.models);
      }
    }
  }
}
