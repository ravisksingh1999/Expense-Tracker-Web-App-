import { useEffect, useState } from "react";
import { deleteExpense, getExpenses } from "../api/api";
import "./ExpenseList.css"; // ✅ Import CSS for styling

const ExpenseList = () => {
  const [entries, setEntries] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const res = await getExpenses(token);
      setEntries(res.data);
    } catch (err) {
      console.error("Error fetching expenses:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteExpense(id, token);
      setEntries(entries.filter((entry) => entry._id !== id)); // Remove from UI
    } catch (err) {
      console.error("Error deleting entry:", err);
    }
  };

  return (
    <div className="expense-list-container">
      <h3>📜 Expense & Income History</h3>
      <ul>
        {entries.length === 0 ? (
          <p>No entries found.</p>
        ) : (
          entries.map((entry) => (
            <li
              key={entry._id}
              className={
                entry.type === "expense" ? "expense-item" : "income-item"
              }
            >
              <span className="amount">
                {entry.type === "expense" ? "🔴 Expense" : "🟢 Income"}: $
                {entry.amount}
              </span>
              <span className="details">
                {entry.category} - {entry.description}
              </span>
              <button
                className="delete-btn"
                onClick={() => handleDelete(entry._id)}
              >
                ❌
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default ExpenseList;
