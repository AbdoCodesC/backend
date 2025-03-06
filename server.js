/* practicing backend using express */

import express from "express";
import usersRouter from "./src/routes/users.routes.js";
import productRouter from "./src/routes/products.routes.js";
import cartRouter from "./src/routes/cart.routes.js";
import authRouter from "./src/routes/auth.routes.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import "./src/strategy/local-strat.js";
import mongoose from "mongoose";
import env from "dotenv";
env.config();

export const app = express();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDb connected"))
  .catch((err) => console.log(`Error ${err}`));

app.use(express.json());
app.use(cookieParser("helloworld"));
app.use(
  session({
    secret: process.env.SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: { maxAge: 60000 * 60 }, // 1 hr
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  console.log(req.method + " " + req.url);
  next();
});

app.post("/api/auth", passport.authenticate("local"), (req, res) => {
  res.sendStatus(200);
});

app.get("/api/auth/status", (req, res) => {
  console.log(`inside auth/status endpoint`);
  return req.user ? res.status(200).send(req.user) : res.sendStatus(401);
});

app.post("/api/auth/logout", (req, res) => {
  if (!req.user) return res.sendStatus(401);

  req.logout((err) => {
    if (err) return res.sendStatus(400);

    res.sendStatus(200);
  });
});

app.use("/api/users", usersRouter);
app.use("/api/products", productRouter);
// app.use("/api/auth", authRouter);
app.use("/api/cart", cartRouter);

app.get("/", (req, res) => {
  console.log(req.session);
  console.log(req.sessionID);
  req.session.visited = true;
  res.cookie("name", "abdo", { maxAge: 6000, signed: true });
  res.status(201).send({ message: "Hello, World!" });
});

// app.use("*", (req, res, next) => {
//   res.status(404).json({ message: "Wrong URL, try another URL." });
//   next();
// });

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`server is running port ${port}`);
});
