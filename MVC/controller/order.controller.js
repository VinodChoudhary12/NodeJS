import CartItem from "../models/cart.model.js";
import Order from "../models/order.model.js";
import Product from "../models/product.model.js";

// caulaet total price

const placeOrder = async (req, res, next) => {
  try {
    const { userId } = req.body;

    const cartItems = await CartItem.findAll({ where: { userId } });

    if (cartItems.length === 0) {
      return res.status(400).json({ msg: "No items in cart to place order" });
    }

    const orderId = generateOrderId();

    const calculateTotalPrice = async (cartItems) => {
      let totalPrice = 0;

      for (const cartItem of cartItems) {
        const product = await Product.findByPk(cartItem.productId);
        if (product) {
          totalPrice += product.price * cartItem.quantity;
        }
      }

      return totalPrice;
    };

    const totalPrice = await calculateTotalPrice(cartItems);

    const orderItems = cartItems.map((cartItem) => ({
      orderId,
      userId: cartItem.userId,
      productId: cartItem.productId,
      quantity: cartItem.quantity,
      totalPrice, // Use the calculated total price here
    }));

    await Order.bulkCreate(orderItems);

    // calculte order total of user send it in resposne

    const grandTotal = async () => {
      let total = 0;
      const orderDetails = await Order.findAll({ where: { orderId } });
      orderDetails.forEach((order) => {
        total += order.totalPrice;
      });
      return total;
    };
    const Payble_Price_total = await grandTotal();

    await CartItem.destroy({ where: { userId } });

    return res.status(201).json({
      msg: "Order placed successfully",
      OrderId: orderId,
      Total_Price: Payble_Price_total,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(400)
      .json({ error: "Something went wrong in order placed" });
  }
};

const cancleOrder = async (req, res, next) => {
  try {
    console.log(req.body);
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ error: "Somthing went wrong in order palced" });
  }
};

function generateOrderId() {
  const timestamp = new Date().getTime();
  const randomString = Math.random().toString(36).substring(2, 8);
  return `${timestamp}-${randomString}`;
}

export { cancleOrder, placeOrder };
