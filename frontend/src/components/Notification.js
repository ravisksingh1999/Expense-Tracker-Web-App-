import { useEffect, useState } from "react";
import "./Notification.css"; // ✅ Import styles

const Notification = ({ balance, income, expenses }) => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (expenses > income) {
      setMessage("⚠️ Warning: Your expenses exceed your income!");
    } else if (balance < 550) {
      setMessage("⚠️ Alert: Your balance is running low!");
    } else {
      setMessage(""); // ✅ No alert if everything is fine
    }

    const timer = setTimeout(() => setMessage(""), 5000); // ✅ Auto-hide after 5 sec
    return () => clearTimeout(timer);
  }, [balance, income, expenses]);

  if (!message) return null; // ✅ Don't show empty notifications

  return <div className="notification">{message}</div>;
};

export default Notification;
