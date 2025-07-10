import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import { getExpenses } from "../api/api";
import profilee from "../assets/avataaars.png";
import { AuthContext } from "../context/AuthContext";
import Calculator from "../pages/Calculator";
import BarChart from "./BarChart";
import "./Dashboard.css"; // ✅ Import CSS for styling
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";
import IncomeForm from "./IncomeForm";
import Notification from "./Notification";
import PieChart from "./PieChart";
const Dashboard = () => {
  const { user, setUser } = useContext(AuthContext);
  const [entries, setEntries] = useState([]);
  const [selectedSection, setSelectedSection] = useState("history");
  const token = localStorage.getItem("token");
  const navigate = useNavigate(); // ✅ Use useNavigate for redirection

  const fetchEntries = useCallback(async () => {
    if (!token) {
      console.error("❌ Token missing - Unable to fetch data");
      return;
    }

    try {
      console.log("Fetching data...");
      const res = await getExpenses(token);
      setEntries(res.data);
      console.log("✅ Data fetched successfully:", res.data);
    } catch (err) {
      console.error("❌ Error fetching expenses:", err);
    }
  }, [token]);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  const income = entries
    .filter((e) => e.type === "income")
    .reduce((sum, e) => sum + e.amount, 0);
  const expenses = entries
    .filter((e) => e.type === "expense")
    .reduce((sum, e) => sum + e.amount, 0);
  const balance = income - expenses;

  // ✅ Logout Function
  const handleLogout = () => {
    localStorage.removeItem("token"); // ✅ Clear authentication token
    setUser(null); // ✅ Reset user state
    navigate("/"); // ✅ Redirect to home page
  };

  return (
    <div className="dashboard-container">
      {/* ✅ Left Sidebar */}
      <div className="sidebar">
        <img src={profilee} alt="Profile" className="profile-pic" />
        <h3>{user?.name || "User"}</h3>
        <p>{user?.email || "user@example.com"}</p>

        <nav>
          <button onClick={() => setSelectedSection("history")}>
            📜 History
          </button>
          <button onClick={() => setSelectedSection("add-income")}>
            💰 Add Income
          </button>
          <button onClick={() => setSelectedSection("add-expense")}>
            💸 Add Expense
          </button>
          <button onClick={() => setSelectedSection("charts")}>
            📊 Show Charts
          </button>
          <button onClick={() => setSelectedSection("calculator")}>
            🧮 Calculator
          </button>
        </nav>

        <button className="logout-btn" onClick={handleLogout}>
          🚪 Logout
        </button>
      </div>

      {/* ✅ Right Section - Dynamic Content */}
      <div className="content">
        <h2>Welcome, {user?.name || "User"} 👋</h2>
        <Notification balance={balance} income={income} expenses={expenses} />
        {/* ✅ Stylish Balance Section */}
        <div className="balance-container">
          <div className="balance-card total-balance">
            <h3>💰 Total Balance</h3>
            <p>${balance}</p>
          </div>
          <div className="balance-card income">
            <h3>🟢 Total Income</h3>
            <p>${income}</p>
          </div>
          <div className="balance-card expense">
            <h3>🔴 Total Expenses</h3>
            <p>${expenses}</p>
          </div>
        </div>

        {/* ✅ Content Switching Based on Selected Section */}
        <div className="dashboard-section">
          {selectedSection === "history" && <ExpenseList />}
          {selectedSection === "add-income" && (
            <IncomeForm onAdd={fetchEntries} />
          )}
          {selectedSection === "add-expense" && (
            <ExpenseForm onAdd={fetchEntries} />
          )}
          {selectedSection === "charts" && (
            <>
              <PieChart data={entries} />
              <BarChart data={entries} />
            </>
          )}
          {selectedSection === "calculator" && <Calculator />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
