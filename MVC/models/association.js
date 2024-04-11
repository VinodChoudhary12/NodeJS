import CartItem from "./cart.model.js";
import Category from "./category.models.js";
import Order from './order.model.js';
import Product from "./product.model.js";
import User from "./user.model.js";
Category.hasMany(Product, {
  foreignKey: "Productcategoryname",
});
Product.belongsTo(Category, {
  foreignKey: "Productcategoryname",
  targetKey: "categoryName",
});

// cart item and product realtionships
User.hasMany(CartItem, { foreignKey: "userId" });
CartItem.belongsTo(User, { foreignKey: "userId", targetKey: "id" });

Product.hasOne(CartItem, {
  foreignKey: "productId",
});

CartItem.belongsTo(Product, {
  foreignKey: "productId",
  targetKey: "id",
});

// order and cart , user relationship

User.hasMany(Order, {
  foreignKey: "userId",
});

Order.belongsTo(User, {
  foreignKey: "userId",
  targetKey: "id",
});

// CartItem and Order association
CartItem.belongsTo(Order, { foreignKey: "cartIteamId" });
Order.hasMany(CartItem, { foreignKey: "cartIteamId", targetKey: "userId" });

export { CartItem, Category, Product };
