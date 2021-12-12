import express from "express";
import routes from "./routes";
import { APP_PORT, DB_URL } from "./config";
import errorHandler from "./middlewares/errorHandler";
import mongoose from "mongoose";
import path from "path";
const app = express();

global.appRoot = path.resolve(__dirname);

//Database connection
mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("DB Connected....");
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api", routes);

app.get("/", (req, res) => {
  res.send("hi");
});

app.use(errorHandler);
app.listen(APP_PORT, () => {
  console.log(`listening at port ${APP_PORT}`);
});
