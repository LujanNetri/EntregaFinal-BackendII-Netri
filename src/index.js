import express from "express";
import { engine } from "express-handlebars";
import { join, __dirname } from "./utils/index.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { connectDb } from "./config/database.js";
import usersRoutes from "./routes/users.routes.js";
import productsRoutes from "./routes/products.routes.js";
import cartsRoutes from "./routes/carts.routes.js";
import sessionsRoutes from "./routes/session.routes.js";
import viewRoutes from "./routes/views.routes.js";
import initializePassport from "./config/passport.config.js"
import passport from "passport";
import "./dao/models/cart.model.js";

dotenv.config()
const app = express();

app.set("PORT", process.env.PORT);
const secret = process.env.SESSION_SECRET;
const url = process.env.MONGO_URL

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", join(__dirname, "views"));

connectDb(url)
console.log("Conectando a:", url);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(join(__dirname, "../public")));
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: url,
      ttl: 60000,
    }),
    secret,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(cookieParser());
app.use(express.static("src/public"))
initializePassport();
app.use(passport.initialize());

app.get("/", (req, res) => {
  res.render("home", { title: "HOME" });
});

app.use("/api/users", usersRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/carts", cartsRoutes);
app.use("/api/sessions", sessionsRoutes);
app.use("/", viewRoutes);

app.listen(app.get("PORT"), () => {
  console.log(`Server on port http://localhost:${app.get("PORT")}`);
});
