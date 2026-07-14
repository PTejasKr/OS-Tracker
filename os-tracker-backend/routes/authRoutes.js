const express = require('express');
const router = express.Router();
const { register, verifyEmail, login, getMe } = require('../controllers/authController');
const auth = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/verify-email', verifyEmail);
router.post('/login', login);
router.get('/me', auth, getMe);

module.exports = router;
