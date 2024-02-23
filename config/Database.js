import { Sequelize } from "sequelize";

const db = new Sequelize("enam_dua_db", "root", "", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

export default db;
