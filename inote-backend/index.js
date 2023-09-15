const connectToMongo = require("./db");
connectToMongo();
const cors = require("cors");
const express = require("express");

const app = express();
const port = 7000;

app.use(cors());
app.use(express.json()); // to access content of req.body
//available routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.get("/", (req, res) => {
  res.send("hello home!");
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
