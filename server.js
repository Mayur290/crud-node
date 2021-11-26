const express = require("express");
const app = express();
const path = require("path");

const PORT = process.env.PORT || 3000;

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  //   res.sendFile(path.resolve(__dirname) + "/index.html");
  res.render("index", { title: "My Home Page" });
});

app.get("/about", (req, res) => {
  res.render("about");
});

// console.log(path.resolve(__dirname));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
