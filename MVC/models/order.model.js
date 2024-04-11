import { DataTypes } from "sequelize";
import { sequelize } from "../db/dbConfig.js";

const Order = sequelize.define("order", {
  orderId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  orderDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  // user id fk from user table
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  //quantity for ordered product
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    isNonNegative(value) {
      if (value < 0) {
        throw new Error("Quantity must be a non-negative number");
      }
    },
  },
  status: {
    type: DataTypes.ENUM(
      "pending",
      "processing",
      "shipped",
      "delivered",
      "canceled"
    ),
    allowNull: false,
    defaultValue: "pending",
  },
  totalPrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
    isNonNegative(value) {
      if (value < 0) {
        throw new Error("Total Price non negetive");
      }
    },
  },
});

Order.sync()
  .then(() => {
    console.log("Order table is created");
  })
  .catch(() => {
    console.log("Order table is creat to failed");
  });

export default Order;
