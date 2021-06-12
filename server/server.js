const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./controllers/auth");

app.use(cors());

const connection_uri =
  "mongodb+srv://RetoAdmin:1eKHt1wxTLlO9xIm@cluster0.66jit.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority";

mongoose
  .connect(connection_uri, {
    useCreateIndex: true,
    useFindAndModify: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB has successfully connected.");
  })
  .catch(() => {
    console.log("MongoDB has failed to connect successfully");
  });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
