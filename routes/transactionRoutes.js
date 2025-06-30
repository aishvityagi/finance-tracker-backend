const express = require("express");
const auth = require("../middlewares/authMiddleware");
const Transaction = require("../models/Transaction");

const router = express.Router();

// 🔘 GET /api/transactions → Filter or get all
router.get("/", auth, async (req, res) => {
  console.log("✅ /api/transactions GET route hit");
  try {
    const { startDate, endDate, category, description } = req.query;

    const query = { userId: req.user };

    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    if (category) {
      query.category = category;
    }

    if (description) {
      query.description = { $regex: description, $options: "i" };
    }

    const transactions = await Transaction.find(query).sort({ date: -1 });
    res.json(transactions);
  } catch (err) {
    console.error("💥 Error in GET /transactions:", err); // 🛠 log it clearly
    res.status(500).json({ message: "Server error" });
  }
});

// 🔘 PUT /api/transactions/:id → Update transaction
router.put("/:id", auth, async (req, res) => {
  try {
    const updated = await Transaction.findOneAndUpdate(
      { _id: req.params.id, userId: req.user },
      { ...req.body, updatedAt: new Date() },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Not found" });

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// 🔘 DELETE /api/transactions/:id → Delete
router.delete("/:id", auth, async (req, res) => {
  try {
    const deleted = await Transaction.findOneAndDelete({
      _id: req.params.id,
      userId: req.user,
    });

    if (!deleted) return res.status(404).json({ message: "Not found" });

    res.json({ message: "Transaction deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// 🔘 POST /api/transactions → Create transaction
router.post("/", auth, async (req, res) => {
  try {
    const { amount, type, category, description, date } = req.body;

    const newTransaction = new Transaction({
      userId: req.user,
      amount,
      type,
      category,
      description,
      date: new Date(date),
    });

    await newTransaction.save();

    res.status(201).json(newTransaction);
  } catch (err) {
    console.error("Error in POST /transactions:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
