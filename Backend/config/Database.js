import {Sequelize} from "sequelize";

const db = new Sequelize('bali_pure_tour', 'root', '',{
  host:"localhost",
  dialect: "mysql",
});

export default db;