import bodyParser from "body-parser";
import express from "express";
import { connectDB } from "./db/dbconfigue.js";
import userRouter from "./routes/user.routes.js";

const port = 8000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/user", userRouter);
connectDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server listen on http://localhost:${port}`);
        });
    })
    .catch((err) => {
        console.log("Mysql Fail to connect !!!", err);
    });