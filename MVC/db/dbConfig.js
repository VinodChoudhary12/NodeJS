import { Sequelize } from "sequelize";

const sequelize = new Sequelize("ecomercenode", "root", "root", {
  host: "localhost",
  dialect: "mysql",
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log(`Connecion to DataBase success mysql !!`);
  } catch (error) {
    console.log(`Fild to connect mysql`, error);
    process.exit(1);
  }
};

export { connectDB, sequelize };

