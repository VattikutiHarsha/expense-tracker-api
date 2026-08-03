const expenseService = require("../services/expenseService");

async function getExpenses(req, res) {
    try {
        const { category } = req.query;

        let expenses;

        if(category) {
            expenses = await expenseService.getExpensesByCategory(category);
        } else {
            expenses = await expenseService.getAllExpenses();
        }

        res.status(200).json(expenses);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

async function createExpense (req, res) {
    try {
        const newExpense = await expenseService.addExpense(req.body);

        res.status(201).json(newExpense);
    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
}

async function removeExpense (req, res) {

    try {
        const deleted = await expenseService.deleteExpense(req.params.id);

        if (!deleted) {

            return res.status(404).json({
                message: "Expense not found"
            });
        }

        res.status(200).json({
            message: "Expense deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

async function getExpensesByCategory(req, res) {

    try {

        const expenses = await expenseService.getExpensesByCategory(
            req.query.category
        );

        res.status(200).json(expenses);
    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
}

async function getTotal (req, res) {
    try {

        const total = await expenseService.calculateTotal(
            req.query.category
        );

        res.status(200).json({
            total
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
}

module.exports = {
    getExpenses,
    createExpense,
    removeExpense,
    getExpensesByCategory,
    getTotal
};