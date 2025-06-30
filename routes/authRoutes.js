const express = require("express");
const { check, validationResult } = require("express-validator");
const { register, login } = require("../controllers/authController");

const router = express.Router();

// POST /api/auth/register
router.post(
  "/register",
  [
    check("username", "Username is required").not().isEmpty(),
    check("email", "Valid email is required").isEmail(),
    check("password", "Password must be at least 6 characters").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    // Handle validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    // Call controller
    return register(req, res);
  }
);

// POST /api/auth/login
router.post(
  "/login",
  [
    check("email", "Valid email is required").isEmail(),
    check("password", "Password is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    return login(req, res);
  }
);

module.exports = router;
