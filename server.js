const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

let lostItems = [];

app.post("/api/items", (req, res) => {
  const item = req.body;
  lostItems.push(item);
  res.status(201).send(item);
});

app.get("/api/items", (req, res) => {
  res.status(200).send(lostItems);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
