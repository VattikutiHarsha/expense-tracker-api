function validateExpense (req, res, next) {
    const { title, amount, category, date } = req.body;

    if (!title || title.trim() === "") {
        return res.status(400).json({
            message: "Title is required"
        });
    }

    if (amount === undefined || isNaN(amount) || Number(amount) <= 0) {
        return res.status(400).json({
            message: "Amount must be greater than 0"
        });
    }

    if (!category || category.trim() === "") {
        return res.status(400).json({
            message: "Category is required"
        });
    }

    if (!date || isNaN(Date.parse(date))) {
        return res.status(400).json({
            message: "Invalid date"
        });
    }

    next();
}

module.exports = validateExpense;