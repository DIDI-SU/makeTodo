const express = require("express");
const app = express();

const PORT = 4000;

app.listen(PORT, () => console.log(`server is on${PORT}`));

app.use(express.static("src"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/src/html/home.html");
});
