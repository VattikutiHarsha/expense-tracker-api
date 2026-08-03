const express = require("express");

const expenseRoutes = require("./routes/expenseRoutes");

const app = express();

app.use(express.json());

app.use("/expenses", expenseRoutes);

app.use((req, res) => {
    res.status(404).json({
        message: "Route not found"
    });
});

module.exports = app;