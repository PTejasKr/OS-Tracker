const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// Blocked email domains per BRD business rules
const BLOCKED_DOMAINS = ['blocked.com', 'spam.com', 'tempmail.com'];

const register = async (req, res) => {
  const { username, email, name, password } = req.body;

  try {
    // Basic validation
    if (!username || !email || !name || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // 1. Business Rule: Block registration if email domain is in blocked list
    const domain = email.substring(email.lastIndexOf('@') + 1).toLowerCase();
    if (BLOCKED_DOMAINS.includes(domain)) {
      return res.status(400).json({ error: 'Registration failed: email domain is blocked' });
    }

    let userExists = await User.findOne({ $or: [{ username }, { email }] });
    if (userExists) {
      return res.status(400).json({ error: 'Username or Email already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 2. State Transition: User created in PENDING state with verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const tokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours expiry per BRD

    const user = new User({
      username,
      email,
      name,
      password: hashedPassword,
      status: 'PENDING',
      emailVerificationToken: verificationToken,
      emailVerificationExpires: tokenExpires,
      favorites: []
    });

    await user.save();

    res.status(201).json({
      message: 'Registration successful. Verification token generated.',
      status: 'PENDING',
      verificationToken // Expose for testing/flow verification
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// 3. Process Sequence: User verifies email using link/token
const verifyEmail = async (req, res) => {
  const { token } = req.body;

  try {
    if (!token) {
      return res.status(400).json({ error: 'Verification token is required' });
    }

    // Find pending user with valid, non-expired token
    const user = await User.findOne({
      emailVerificationToken: token,
      emailVerificationExpires: { $gt: Date.now() },
      status: 'PENDING'
    });

    if (!user) {
      return res.status(400).json({ error: 'Invalid or expired verification token' });
    }

    // 4. State Transition: Pending Verification -> ACTIVE state
    user.status = 'ACTIVE';
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;

    await user.save();

    const payload = { userId: user.id };
    const jwtToken = jwt.sign(payload, process.env.JWT_SECRET || 'jwtsecretkey', { expiresIn: '7d' });

    res.status(200).json({
      message: 'Email verification successful. Account is now active.',
      token: jwtToken,
      user: {
        username: user.username,
        email: user.email,
        name: user.name,
        status: user.status,
        favorites: user.favorites
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ error: 'Invalid Credentials' });
    }

    // Enforce email verification before letting them login
    if (user.status !== 'ACTIVE') {
      return res.status(401).json({ error: 'Account pending email verification' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid Credentials' });
    }

    const payload = { userId: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'jwtsecretkey', { expiresIn: '7d' });

    res.json({
      token,
      user: {
        username: user.username,
        email: user.email,
        name: user.name,
        status: user.status,
        favorites: user.favorites
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

module.exports = { register, verifyEmail, login, getMe };
