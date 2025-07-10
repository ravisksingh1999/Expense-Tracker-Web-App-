const Expense = require("../models/Expense");

// Add expense or income
exports.addEntry = async (req, res) => {
  const { amount, category, description, type } = req.body;

  try {
    const newExpense = new Expense({
      user: req.user,
      amount,
      category,
      description,
      type,
    });
    await newExpense.save();
    res.json({ message: "Entry added successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to add entry" });
  }
};

// Fetch all expenses and incomes
exports.getEntries = async (req, res) => {
  try {
    const entries = await Expense.find({ user: req.user }).sort({ date: -1 });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
};

// Delete an entry
exports.deleteEntry = async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.json({ message: "Entry deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete entry" });
  }
};
