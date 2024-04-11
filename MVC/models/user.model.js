import bcrypt from "bcrypt";
import { DataTypes } from "sequelize";
import { sequelize } from "../db/dbConfig.js";

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
    set(value) {
      if (this.changed("password")) {
        const hashedPassword = bcrypt.hashSync(value, 10);
        console.log("Password successfully encrypted on update");
        this.setDataValue("password", hashedPassword);
      }
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  avtar: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  contact: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

User.checkPassword = function (password, ecpassword) {
  return bcrypt.compareSync(password, ecpassword);
};

User.sync()
  .then(() => console.log(`Created successfully user table`))
  .catch((error) => console.log(`Failed to create user table`, error));

export default User;
