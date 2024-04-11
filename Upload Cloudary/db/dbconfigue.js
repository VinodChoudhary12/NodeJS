
import { Sequelize } from "sequelize";

const sequelize = new Sequelize("FileUpload", "root", "root", {
    host: "localhost",
    dialect: "mysql",
});

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log(`Connection to DataBase success mysql !!`);
    } catch (error) {
        console.log(`Failed to connect mysql`, error);
        process.exit(1);
    }
};

export { connectDB, sequelize };



