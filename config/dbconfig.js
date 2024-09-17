const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("ecommerce_store", "postgres", "darshit", {
  host: "localhost",
  dialect: "postgres",
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

(async () => {
  await sequelize.sync();
  console.log("All models were synchronized successfully");
})();

module.exports = sequelize;