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
  client!: Sequelize;
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
      dialect: "postgres",
      protocol: "postgres",
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    };

    this.client = new Sequelize(
      `postgres://${this.config.db.user}:${this.config.db.password}@${this.config.db.host}:${this.config.db.port}/${this.config.db.name}`,
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
    // await this.client?.query(
    //   fs.readFileSync(path.join(__dirname, "..", "scripts", "script_sql.sql"), {
    //     encoding: "UTF-8",
    //   })
    // );

    // await this.client.drop();
    for (const model of Object.keys(this.models)) {
      try {
        await this.models[model as keyof Models].sync({ force: true });
      } catch (error) {
        console.log(error);
      }
    }
    for (const [, model] of Object.entries(this.models)) {
      if (model.associate) {
        model.associate(this.models);
      }
    }
  }
}
