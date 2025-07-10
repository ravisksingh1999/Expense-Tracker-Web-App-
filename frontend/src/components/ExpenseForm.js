import { useState } from "react";
import { addExpense } from "../api/api";
import "./ExpenseForm.css"; // ✅ Import CSS for styling

const ExpenseForm = ({ onAdd }) => {
  const [data, setData] = useState({
    amount: "",
    category: "Groceries", // ✅ Default category
    description: "",
    type: "expense",
  });
  const [message, setMessage] = useState("");

  const categories = [
    "Groceries",
    "Rent",
    "Utilities",
    "Entertainment",
    "Shopping",
    "Transport",
    "Other",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await addExpense(data, token);
      setMessage("✅ Expense Added Successfully!");
      onAdd(); // Refresh the list
      setTimeout(() => setMessage(""), 3000); // Clear message after 3 sec
    } catch (err) {
      setMessage("❌ Failed to Add Expense");
    }
  };

  return (
    <div className="expense-form-container">
      <h3>Add Expense</h3>
      {message && (
        <div
          className={`notification ${
            message.includes("❌") ? "error" : "success"
          }`}
        >
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Amount"
          onChange={(e) => setData({ ...data, amount: e.target.value })}
          required
        />

        {/* ✅ Dropdown for Expense Categories */}
        <select
          onChange={(e) => setData({ ...data, category: e.target.value })}
        >
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Description"
          onChange={(e) => setData({ ...data, description: e.target.value })}
          required
        />

        <button type="submit">➕ Add Expense</button>
      </form>
    </div>
  );
};

export default ExpenseForm;
