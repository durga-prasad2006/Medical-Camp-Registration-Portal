const campRoutes = require("./routes/campRoute");
const authRoutes = require("./routes/authRoutes");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const seedDatabase = require("./config/seed");

const path = require("path");
dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();

const PORT = process.env.PORT || 5000;
app.use(cors());

app.use(express.json());
app.use("/api", authRoutes);
app.use("/api", campRoutes);

// Connect to MongoDB and seed initial data
connectDB().then(async () => {
    await seedDatabase();
}).catch((err) => {
    console.error("DB setup error:", err);
});

app.get("/", (req, res) => {
    res.send("Medical Camp Registration Portal Backend is Running");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});