import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import "./BarChart.css"; // ✅ Import CSS for styling

// ✅ Register required components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ data }) => {
  if (!data || data.length === 0) {
    return <p className="no-data">No income/expense data available.</p>;
  }

  const categories = [...new Set(data.map((e) => e.category))];

  const incomeData = categories.map((cat) =>
    data
      .filter((e) => e.category === cat && e.type === "income")
      .reduce((sum, e) => sum + e.amount, 0)
  );

  const expenseData = categories.map((cat) =>
    data
      .filter((e) => e.category === cat && e.type === "expense")
      .reduce((sum, e) => sum + e.amount, 0)
  );

  const chartData = {
    labels: categories,
    datasets: [
      {
        label: "Income",
        data: incomeData,
        backgroundColor: "rgba(46, 204, 113, 0.8)", // Green
        borderColor: "rgba(39, 174, 96, 1)",
        borderWidth: 1,
      },
      {
        label: "Expenses",
        data: expenseData,
        backgroundColor: "rgba(231, 76, 60, 0.8)", // Red
        borderColor: "rgba(192, 57, 43, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="bar-chart-container">
      <h3>📊 Income vs Expenses</h3>
      <Bar data={chartData} />
    </div>
  );
};

export default BarChart;
