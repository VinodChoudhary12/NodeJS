import { DataTypes } from "sequelize";
import { sequelize } from "../db/dbconfigue.js";

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  avtar: {
    // Correct the field name to 'avatar' instead of 'avtar'
    type: DataTypes.STRING, // Assuming Cloudinary URL is stored as a string
    allowNull: false, // Allow null values for the 'avatar' field
  },
  contact: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

User.sync()
  .then(() => console.log(`Created successfully user table`))
  .catch((error) => console.log(`Failed to create user table`, error));

export default User;
