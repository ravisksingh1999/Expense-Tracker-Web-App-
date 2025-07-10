import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api/api";
import { AuthContext } from "../context/AuthContext";
import "./Login.css"; // ✅ Import CSS for styling

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await login(credentials);
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);

      setTimeout(() => {
        navigate("/dashboard"); // ✅ Redirect after user state updates
      }, 100);
    } catch (err) {
      console.error("Login Error:", err.response?.data);
      setError(err.response?.data?.error || "❌ Login failed. Try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
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
          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account? <Link to="/register">Sign up here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
