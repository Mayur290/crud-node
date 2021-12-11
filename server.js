import express from "express";
import routes from "./routes";
import { APP_PORT } from "./config";
const app = express();

app.use("/api", routes);

app.get("/", (req, res) => {
  res.send("hi");
});

app.listen(APP_PORT, () => {
  console.log(`listening at port ${APP_PORT}`);
});
