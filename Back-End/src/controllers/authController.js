const User = require('../models/User');

// For demo: store passwords in plain text (for real apps, use bcrypt!)
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'All fields required' });
    }
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ success: false, message: 'Email already registered' });
    }
    const user = await User.create({ name, email, password });
    res.json({ 
      success: true, 
      message: 'Registration successful', 
      user: { 
        _id: user._id,
        name: user.name, 
        email: user.email 
      } 
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Registration failed', error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    res.json({ 
      success: true, 
      message: 'Login successful', 
      user: { 
        _id: user._id,
        name: user.name, 
        email: user.email 
      } 
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Login failed', error: err.message });
  }
};
