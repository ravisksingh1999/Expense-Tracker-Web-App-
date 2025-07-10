import { useState } from "react";
import "./Calculator.css"; // ✅ Import styles

const Calculator = () => {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [time, setTime] = useState("");
  const [compoundFreq, setCompoundFreq] = useState("1"); // Default: Annually
  const [result, setResult] = useState(null);
  const [type, setType] = useState("simple");

  const calculate = () => {
    const P = parseFloat(principal);
    const R = parseFloat(rate) / 100;
    const T = parseFloat(time);
    const N = parseInt(compoundFreq);

    if (isNaN(P) || isNaN(R) || isNaN(T)) {
      alert("⚠️ Please enter valid numbers!");
      return;
    }

    let calculatedResult = 0;
    if (type === "simple") {
      calculatedResult = (P * R * T).toFixed(2); // Simple Interest
    } else if (type === "compound") {
      calculatedResult = (P * Math.pow(1 + R / N, N * T) - P).toFixed(2); // Compound Interest
    } else if (type === "emi") {
      const monthlyRate = R / 12;
      const months = T * 12;
      calculatedResult = (
        (P * monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1)
      ).toFixed(2); // Loan EMI
    }

    setResult(
      `Calculated ${type.toUpperCase()} Interest: $${calculatedResult}`
    );
  };

  return (
    <div className="calculator-container">
      <h2>📊 Financial Calculator</h2>

      <div className="form-group">
        <label>💰 Principal Amount ($):</label>
        <input
          type="number"
          value={principal}
          onChange={(e) => setPrincipal(e.target.value)}
          placeholder="Enter principal amount"
        />
      </div>

      <div className="form-group">
        <label>📈 Annual Interest Rate (%):</label>
        <input
          type="number"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          placeholder="Enter interest rate"
        />
      </div>

      <div className="form-group">
        <label>⏳ Time Period (years):</label>
        <input
          type="number"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          placeholder="Enter time in years"
        />
      </div>

      {/* ✅ Dropdown for Calculation Type */}
      <div className="form-group">
        <label>🔄 Calculation Type:</label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="simple">Simple Interest</option>
          <option value="compound">Compound Interest</option>
          <option value="emi">Loan EMI</option>
        </select>
      </div>

      {/* ✅ Compound Interest Frequency (Only for Compound Interest) */}
      {type === "compound" && (
        <div className="form-group">
          <label>📆 Compound Frequency:</label>
          <select
            value={compoundFreq}
            onChange={(e) => setCompoundFreq(e.target.value)}
          >
            <option value="1">Annually</option>
            <option value="4">Quarterly</option>
            <option value="12">Monthly</option>
          </select>
        </div>
      )}

      <button className="calculate-btn" onClick={calculate}>
        🔢 Calculate
      </button>

      {result && <div className="result">{result}</div>}
    </div>
  );
};

export default Calculator;
