const User = require('../models/user');

module.exports = {
  showRegister: (req, res) => {
    res.render('auth/register', { error: null, form: {} });
  },

  register: async (req, res) => {
    const { username, password, name } = req.body;
    try {
      if (!username || !password) {
        return res.render('auth/register', { error: 'Username and password required', form: req.body });
      }
      const existing = await User.findOne({ username });
      if (existing) {
        return res.render('auth/register', { error: 'Username already taken', form: req.body });
      }
      const user = await User.register(username, password, name);
      req.session.user = { _id: user._id, username: user.username, name: user.name };
      res.redirect('/employees');
    } catch (err) {
      console.error(err);
      res.render('auth/register', { error: 'Registration failed', form: req.body });
    }
  },

  showLogin: (req, res) => {
    res.render('auth/login', { error: null });
  },

  login: async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return res.render('auth/login', { error: 'Invalid credentials' });
      }
      const valid = await user.validatePassword(password);
      if (!valid) {
        return res.render('auth/login', { error: 'Invalid credentials' });
      }
      req.session.user = { _id: user._id, username: user.username, name: user.name };
      const redirectTo = req.session.returnTo || '/employees';
      delete req.session.returnTo;
      res.redirect(redirectTo);
    } catch (err) {
      console.error(err);
      res.render('auth/login', { error: 'Login error' });
    }
  },

  logout: (req, res) => {
    req.session.destroy(() => res.redirect('/'));
  }
};
