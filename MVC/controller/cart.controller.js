import { Op } from "sequelize";
import CartItem from "../models/cart.model.js";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";


// add to cart
const addItemInCart = async (req, res, next) => {
  try {
    console.log(req.body);
    const { userId, productId, quantity } = req.body;

    const userExist = await User.findByPk(userId);
    const productExists = await Product.findByPk(productId);

    if (!userExist) {
      return res.status(400).json({ msg: "User does not exist." });
    }

    if (!productExists) {
      return res.status(400).json({ msg: "Product does not exist." });
    }

    const cartItemExist = await CartItem.findOne({
      where: { userId, productId },
    });

    if (cartItemExist) {
      return res.status(409).json({
        msg: "Product already added to cart. Use updateCart to modify quantity.",
      });
    }

    await CartItem.create({ userId, productId, quantity });

    return res.status(201).json({
      msg: `Added to cart successfully. User ID: ${userId}, Product ID: ${productId}`,
    });
  } catch (error) {
    console.error("Something went wrong", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

// get product in cart have
const getProductInCart = async (req, res, next) => {
  try {
    console.log(req.params.id);
    await CartItem.findAll({ where: { userId: req.params.id } })
      .then((result) => {
        if (result.length == 0) {
          return res.status(200).json({ message: "cart is empty" });
        }
        return res.status(200).json({ message: result });
      })
      .catch((error) => {
        return res.status(400).json({ error: "cart is empty" });
      });
  } catch (error) {
    console.log("somthing error", error);
    return res.status(409).json({ error: "somthinf wnet wrong" });
  }
};

// increse cart product quintity

const increseQuintity = async (req, res) => {
  try {
    console.log(req.body);
    const { userId, productId, quantity } = req.body;

    const checkQuintity = await CartItem.increment("quantity", {
      by: 1,
      where: {
        [Op.and]: [{ userId }, { productId }],
      },
      raw: true,
    })
      .then((result) => {
        return res.status(200).json({ message: "Qunatity updated " });
      })
      .catch(() => {
        return res
          .status(400)
          .json({ message: "Quintity not update something went wrong" });
      });
  } catch (error) {
    return res.status(409).json({ error: "somthinf wnet wrong" });
  }
};

///descrese cart product quintity
const decreseQuintity = async (req, res, next) => {
  try {
    console.log(req.body);
    const { userId, productId, quantity } = req.body;

    const checkQuintity = await CartItem.decrement("quantity", {
      by: 1,
      where: {
        [Op.and]: [{ userId }, { productId }],
      },
      raw: true,
    })
      .then((result) => {
        return res.status(200).json({ message: "Qunatity updated " });
      })
      .catch(() => {
        return res
          .status(400)
          .json({ message: "Quintity not update something went wrong" });
      });
  } catch (error) {
    return res.status(409).json({ error: "somthinf wnet wrong" });
  }
};
export { addItemInCart, decreseQuintity, getProductInCart, increseQuintity };
