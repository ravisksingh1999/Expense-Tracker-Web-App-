import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../api/api";
import "./Register.css"; // ✅ Import CSS for styling

const Register = () => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!credentials.name || !credentials.email || !credentials.password) {
      setError("⚠️ All fields are required.");
      return;
    }

    try {
      const res = await register(credentials);
      alert("✅ Registration successful!");
      navigate("/login");
    } catch (err) {
      console.error("Registration Error:", err.response?.data);
      setError(
        err.response?.data?.error || "❌ Registration failed. Please try again."
      );
    }
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h2>Register</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            onChange={(e) =>
              setCredentials({ ...credentials, name: e.target.value })
            }
            required
          />
          <input
            type="email"
            placeholder="Email"
            onChange={(e) =>
              setCredentials({ ...credentials, email: e.target.value })
            }
            required
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
            required
          />
          <button type="submit">Register</button>
        </form>
        <p>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
