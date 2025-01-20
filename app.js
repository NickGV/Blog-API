const express = require("express");
const authRoutes = require("./src/routes/authRoutes");
const postRoutes = require("./src/routes/postRoutes");
const commentRoutes = require("./src/routes/commentRoutes");
require("dotenv").config();

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.use("/auth", authRoutes);
app.use("/posts", postRoutes);
app.use("/comments", commentRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
