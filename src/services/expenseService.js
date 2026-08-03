const { v4: uuidv4 } = require("uuid");
const { readExpenses, writeExpenses } = require("../utils/fileHandler");

async function getAllExpenses() {
    return await readExpenses();
}

async function addExpense(expenseData) {
    const expenses = await readExpenses();

    const newExpense = {
        id: uuidv4(),
        title: expenseData.title,
        amount: Number(expenseData.amount),
        category: expenseData.category,
        date: expenseData.date
    };

    expenses.push(newExpense);

    await writeExpenses(expenses);

    return newExpense;
}

async function deleteExpense(id) {
    const expenses = await readExpenses();

    const updateExpenses = expenses.filter(expense => expense.id != id);

    if(updateExpenses.length === expenses.length) {
        return null;
    }

    await writeExpenses(updateExpenses);

    return true;
}

async function getExpensesByCategory(category) {
    const expenses = await readExpenses();

    if (!category) {
        return expenses;
    }

    return expenses.filter(
        expense => 
            expense.category.toLowerCase() === category.toLowerCase()
    );
}

async function calculateTotal(category) {
    const expenses = await readExpenses();

    let filteredExpenses = expenses;

    if (category) {
        filteredExpenses = expenses.filter(expense =>
            expense.category.toLowerCase() === category.toLowerCase()
        );
    }

    return filteredExpenses.reduce(
        (total, expense) => total + expense.amount,
        0
    );
}

module.exports = {
    getAllExpenses,
    addExpense,
    deleteExpense,
    getExpensesByCategory,
    calculateTotal
};