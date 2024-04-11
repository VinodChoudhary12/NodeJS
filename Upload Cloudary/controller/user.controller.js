
import jwt from "jsonwebtoken";
import { Op, where } from "sequelize";
import User from "../model/user.model.js";
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import { v2 as cloudinary } from "cloudinary";

export const registerUser = async (req, res, next) => {
    try {
        const { username, email, password, contact } = req.body;
        const avatar = req.file.filename; // Get the file name from req.file.filename
        console.log(avatar);

        if (!username || !email || !password || !contact || !avatar) {
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

        // Upload the file to Cloudinary or any other storage service
        const cloudinaryResponse = await uploadOnCloudinary(`./public/${avatar}`);
        console.log(cloudinaryResponse);
        if (!cloudinaryResponse) {

            return res.status(500).json({ error: "Failed to upload file to Cloudinary", });
        }

        // Create a new user with the uploaded avatar
        const newUser = await User.create({
            username,
            email,
            password,
            avtar: cloudinaryResponse.url, // Use the URL provided by Cloudinary
            contact,
        });

        res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const signin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        const user = await User.findOne({
            where: { email },
        });
        if (user && User.checkPassword(password, user.password)) {
            let payload = { subject: user.email };
            let token = jwt.sign(payload, "your_secret_key_here");
            return res
                .status(201)
                .json({ message: "Sign in successful", user, token });
        } else {
            return res.status(401).json({ message: "Incorrect Password or Email" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
export const getAllUserData = async (req, res, next) => {
    try {
        // Fetch all users with their data including avatar URLs
        const users = await User.findAll();
        if (!users || users.length === 0) {
            return res.status(404).json({ error: "No user data found" });
        }
        // Map users to include Cloudinary URLs
        const userData = users.map((user) => {
            return {
                id: user.id,
                username: user.username,
                email: user.email,
                // avatarUrl: user.avtar ? `http://res.cloudinary.com/dapys6ybw/image/upload/${user.avatar}` : null,
                avatarUrl: cloudinary.url(user.avtar, { secure: true }),
                contact: user.contact,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            };
        });
        // Return the list of user data including avatar URLs in the response
        res.status(200).json({ users: userData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const deleteUser = async (req, res, next) => {
    try {
        let id = req.params.id;
        console.log(id);
        const userdata = await User.destroy({ where: { id } })
        if (!userdata)
            res.status(404).json({ error: "User Not Found" });
        res.status(200).json({ msg: "user Deleted" });


    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

