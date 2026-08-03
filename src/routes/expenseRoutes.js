const express = require("express");

const router = express.Router();

const expenseController = require("../controllers/expenseControllers");
const validateExpense = require("../middlewares/validateExpense");

router.get(
    "/",
    expenseController.getExpenses
);

router.post(
    "/",
    validateExpense,
    expenseController.createExpense
);

router.delete(
    "/:id",
    expenseController.removeExpense
);

router.get(
    "/category",
    expenseController.getExpensesByCategory
);

router.get(
    "/total",
    expenseController.getTotal
);

module.exports = router;