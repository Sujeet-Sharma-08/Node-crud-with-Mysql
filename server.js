const express = require("express");
const dotenv = require("dotenv");
const userRouter = require("./src/routes/UserRoute.js");
const connectDB = require("./src/config/db.js");

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use("/api/users", userRouter);

app.get("/", (req, res) => {
    res.send("Hello, Express server is running!");
});

app.listen(PORT, () => {
    console.log(`✅ Server is running at http://localhost:${PORT}`);
});
