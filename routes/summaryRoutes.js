const express = require("express");
const Transaction = require("../models/Transaction");
const auth = require("../middlewares/authMiddleware");

const router = express.Router();

// GET /api/summary?month=6&year=2025
router.get("/", auth, async (req, res) => {
  const userId = req.user;
  const { month, year } = req.query;

  try {
    const start = new Date(`${year}-${month}-01`);
    const end = new Date(start);
    end.setMonth(end.getMonth() + 1);

    const transactions = await Transaction.find({
      userId,
      date: { $gte: start, $lt: end },
    }).sort({ date: -1 });

    const totalIncome = transactions
      .filter((t) => t.type === "Income")
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpense = transactions
      .filter((t) => t.type === "Expense")
      .reduce((sum, t) => sum + t.amount, 0);

    const balance = totalIncome - totalExpense;
    const recentTransactions = transactions.slice(0, 5);

    res.json({ balance, totalIncome, totalExpense, recentTransactions });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
