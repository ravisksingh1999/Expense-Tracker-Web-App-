import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Pie } from "react-chartjs-2";
import "./PieChart.css"; // ✅ Import CSS for styling

// ✅ Register required components
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data }) => {
  if (!data || data.length === 0) {
    return <p className="no-data">No expense data available.</p>;
  }

  const categories = [...new Set(data.map((e) => e.category))];

  const chartData = {
    labels: categories,
    datasets: [
      {
        data: categories.map((cat) =>
          data
            .filter((e) => e.category === cat)
            .reduce((sum, e) => sum + e.amount, 0)
        ),
        backgroundColor: [
          "rgba(231, 76, 60, 0.8)", // Red
          "rgba(52, 152, 219, 0.8)", // Blue
          "rgba(46, 204, 113, 0.8)", // Green
          "rgba(243, 156, 18, 0.8)", // Orange
          "rgba(155, 89, 182, 0.8)", // Purple
        ],
        hoverBackgroundColor: [
          "rgba(231, 76, 60, 1)",
          "rgba(52, 152, 219, 1)",
          "rgba(46, 204, 113, 1)",
          "rgba(243, 156, 18, 1)",
          "rgba(155, 89, 182, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="pie-chart-container">
      <h3>💰 Expense Breakdown</h3>
      <Pie data={chartData} />
    </div>
  );
};

export default PieChart;
