import bodyParser from "body-parser";
import express from "express";
import { connectDB } from "./db/dbConfig.js";
import auth from "./middleware/auth.js";
import "./models/association.js";
// import cartRouter from "./router/cart.router.js";
import cartRouter from "./routes/cart.routes.js"
import catRouter from "./routes/category.routes.js";
import orderRouter from "./routes/order.routes.js";
import productRout from "./routes/product.routes.js";
import userRouter from "./routes/user.routes.js";

const port = 8000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/user", userRouter);
app.use("/api/catergory", catRouter);
app.use("/api/product", productRout);
app.use("/api/cart", auth, cartRouter);
app.use("/api/order", auth, orderRouter);

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server listen on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log("Mysql Fail to connect !!!", err);
  });


