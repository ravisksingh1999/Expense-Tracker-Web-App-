const express = require("express");
const {
  addEntry,
  getEntries,
  deleteEntry,
} = require("../controllers/expenseController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/add", authMiddleware, addEntry);
router.get("/", authMiddleware, getEntries);
router.delete("/:id", authMiddleware, deleteEntry);

module.exports = router;
