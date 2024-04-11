import { DataTypes } from "sequelize";
import { sequelize } from "../db/dbConfig.js";

const CartItem = sequelize.define("CartItem", {
  cartId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    isNonNegative(value) {
      if (value < 1) {
        throw new Error("Quantity must be a non-negative number");
      }
    },
  },
});

export default CartItem;
