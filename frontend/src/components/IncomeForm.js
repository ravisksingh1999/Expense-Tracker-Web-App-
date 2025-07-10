import { useState } from "react";
import { addExpense } from "../api/api";
import "./IncomeForm.css"; // ✅ Import CSS for styling

const IncomeForm = ({ onAdd }) => {
  const [data, setData] = useState({
    amount: "",
    category: "Salary", // ✅ Default category
    description: "",
    type: "income",
  });
  const [message, setMessage] = useState("");

  const categories = [
    "Salary",
    "Bitcoin",
    "Investments",
    "Freelancing",
    "Other",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await addExpense(data, token);
      setMessage("✅ Income Added Successfully!");
      onAdd(); // Refresh the list
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setMessage("❌ Failed to Add Income");
    }
  };

  return (
    <div className="income-form-container">
      <h3>Add Income</h3>
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

        {/* ✅ Dropdown for Categories */}
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
        <button type="submit">💰 Add Income</button>
      </form>
    </div>
  );
};

export default IncomeForm;
