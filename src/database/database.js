import Sequelize from "sequelize";

const NAME_DATABASE = "reviewsequelize";
const NAME_USER = "postgres";
const PASSWORD_USER = "admin";
const HOST = "localhost";
const CLIENT_SQL = "postgres";

export const sequelize = new Sequelize(
  NAME_DATABASE,
  NAME_USER,
  PASSWORD_USER,
  {
    host: HOST,
    dialect: CLIENT_SQL,
  }
);
