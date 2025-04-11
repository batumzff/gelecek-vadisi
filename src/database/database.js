const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("test-db", "user", "pass", {
  dialect: "sqlite",
  host: "./storage/dev.sqlite",
});

module.exports = sequelize;
