import jwt from "jsonwebtoken";
import { Op } from "sequelize";
import User from "../models/user.model.js";

export const registerUser = async (req, res, next) => {
  try {
    const { username, email, password, contact } = req.body;
    req.files.avtar;

    if (!username || !email || !password || !contact) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ email }, { username }],
      },
    });

    if (existingUser) {
      return res
        .status(409)
        .json({ error: "User with this email or username already exists" });
    }

    const newUser = await User.create({
      username,
      email,
      password,
      contact,
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};



export const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    raw: true;
    if (!email || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const user = await User.findOne({
      where: { email },
    });

    if (user) {
      if (User.checkPassword(password, user.password)) {
        let payload = { subject: user.email };
        let token = jwt.sign(payload, "adjlakdladklaldnkandknakdnnakndajdkjkandknadknkndkdajfnvksnfseofiwn");
        return res
          .status(201)
          .json({ message: "Sign is SuccessFully", user, token });
      } else return res.status(401).json({ message: "Incorrect Password !!" });
    }

    return res.status(201).json({ message: "SigIn Details Wrong !!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
