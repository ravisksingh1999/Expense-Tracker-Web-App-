
# 💸 Expense Tracker Web App

A full-stack web application to **track and manage personal expenses** in real-time. Users can register, log in securely, and monitor their spending habits through a clean and responsive interface.

## 🛠️ Tech Stack

### 🔹 Frontend
- React.js (with Hooks)
- Tailwind CSS
- Axios (for API requests)
- React Router DOM

### 🔹 Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JSON Web Tokens (JWT)
- dotenv

## ✨ Features

- ✅ User Registration & Login with JWT Auth
- ✅ Add, Edit, and Delete Expenses
- ✅ View Expenses by Category & Date
- ✅ Responsive Design (Mobile + Desktop)
- ✅ Error Handling & Validation
- ✅ Secure API Endpoints

## 🧪 Project Structure

expense-tracker/
├── backend/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── .env
│ └── server.js
├── frontend/
│ ├── public/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ └── App.js
├── README.md

---

## 🚀 How to Run Locally

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/expense-tracker.git
cd expense-tracker
2. Setup Backend
bash
Copy
Edit
cd backend
npm install
Create a .env file inside backend/ and add:

ini
Copy
Edit
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
Start backend:

bash
Copy
Edit
npm run server
3. Setup Frontend
bash
Copy
Edit
cd ../frontend
npm install
npm start
📸 Screenshots (optional)
Add images like: login screen, dashboard, mobile view etc.

🌐 Live Demo
Frontend: Live Link
Backend: API Demo

📄 License
This project is open-source under the MIT License.

🙋‍♂️ Author
Ravishankar Kumar
Connect on LinkedIn | GitHub: ravisksingh1999
