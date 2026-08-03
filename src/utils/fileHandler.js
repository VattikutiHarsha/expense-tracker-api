const fs = require("fs/promises");
const path = require("path");

const file_path = path.join(__dirname, "../data/expenses.json");

async function readExpenses() {
    const data = await fs.readFile(file_path, "utf-8");
    return JSON.parse(data);
}

async function writeExpenses(expenses) {
    await fs.writeFile(
        file_path,
        JSON.stringify(expenses, null, 2)
    );
}

module.exports = {
    readExpenses,
    writeExpenses
};