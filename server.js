import express from "express";
import routes from "./routes";
import { APP_PORT } from "./config";
import errorHandler from "./middlewares/errorHandler";
const app = express();

app.use(express.json());
app.use("/api", routes);

app.get("/", (req, res) => {
  res.send("hi");
});

app.use(errorHandler);
app.listen(APP_PORT, () => {
  console.log(`listening at port ${APP_PORT}`);
});
