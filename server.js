const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const dotenv = require("dotenv");

dotenv.config();

// Import routes (auth route only for now)
const authRoutes = require("./routes/authRoutes");
const summaryRoutes = require("./routes/summaryRoutes");
const transactionRoutes = require("./routes/transactionRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/summary", summaryRoutes);
app.use("/api/transactions", transactionRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.error("MongoDB connection failed:", err));
