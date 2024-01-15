const express = require("express");
const connectDB = require("./db");
const authRoutes = require("./routes/authRoute");
const userRoutes = require("./routes/userRoute");

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/user", userRoutes);

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
