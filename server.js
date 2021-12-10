import express from "express";
import { APP_PORT } from "./config/index.js";
const app = express();
// const APP_PORT = 3000;

app.get("/", (req, res) => {
  res.send("hi");
});

app.listen(APP_PORT, () => {
  console.log(`listening at port ${APP_PORT}`);
});
