import { useNavigate } from "react-router-dom";
import AnalyticsImage from "../assets/analytics.png";
import DashImage from "../assets/dashboard.png";
import ExpenseTrack from "../assets/expenses.png";
import logo from "../assets/logo.png";
import HeroImage from "../assets/preview.avif";
import "./Home.css"; // ✅ Import styles

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="home-container">
      {/* ✅ Header Section */}
      <header className="home-header">
        <div className="home-logo">
          <img src={logo} alt="App Logo" />
          <h2>Expense Tracker</h2>
        </div>

        {/* ✅ Updated Navbar with Buttons */}
        <div className="home-nav">
          <button
            className="nav-btn login-btn"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
          <button
            className="nav-btn signup-btn"
            onClick={() => navigate("/register")}
          >
            Sign Up
          </button>
        </div>
      </header>

      {/* ✅ Hero Section */}
      <section className="hero">
        <h1>Track Your Expenses Effortlessly</h1>
        <p>Monitor your income & expenses with real-time analytics.</p>
        <img src={HeroImage} alt="App Preview" className="hero-image" />
      </section>

      {/* ✅ Example Screenshots */}
      <section className="example-images">
        <h2>See How It Works</h2>
        <div className="image-gallery">
          <img src={DashImage} alt="Dashboard Preview" />
          <img src={ExpenseTrack} alt="Expense Tracking" />
          <img src={AnalyticsImage} alt="Analytics" />
        </div>
      </section>

      {/* ✅ Footer Section */}
      <footer className="footer">
        <p>&copy; 2025 Expense Tracker. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
