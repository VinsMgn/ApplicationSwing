import dotenv from "dotenv";

dotenv.config({
  path: `./env/.${process.env.ENV}.env`,
});

export interface Config {
  ENV: string;
  API_PORT: string;
  API_HOST: string;
  SECRETJWT: string;
  auth: {
    REFRESH: string;
    AUTH: string;
    JWT: string;
  };
  db: {
    host: string;
    name: string;
    user: string;
    password: string;
  };
  mail: {
    user: string;
    host: string;
    port: number;
    password: string;
  };
  error: Record<string, any>;
}

export const CONFIG: Config = {
  db: {
    host: process.env.DB_HOST!,
    name: process.env.DB_NAME!,
    user: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
  },
  mail: {
    user: "",
    password: "",
    port: 123,
    host: "",
  },
  auth: {
    JWT: "jwt",
    REFRESH: "refresh",
    AUTH: "auth",
  },
  ENV: process.env.ENV!,
  API_PORT: process.env.API_PORT!,
  API_HOST: process.env.API_HOST!,
  SECRETJWT: process.env.SECRETJWT!,
  error: {
    NOT_FOUND: "NOT_FOUND_404",
  },
};
