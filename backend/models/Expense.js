const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    description: { type: String },
    date: { type: Date, default: Date.now },
    type: { type: String, enum: ["income", "expense"], required: true }, // "income" or "expense"
  },
  { timestamps: true }
);

module.exports = mongoose.model("Expense", ExpenseSchema);
