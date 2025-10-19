require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const methodOverride = require('method-override');
const path = require('path');

const authRoutes = require('./routes/auth');
const employeesRoutes = require('./routes/employee');
const passUserToView = require('./middleware/passUserToView');

const app = express();

// Connect to MongoDB (from .env)
const mongoUri = process.env.MONGODB_URI;
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware setup
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// Session setup
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: mongoUri }),
}));

// Attach current user to all views
app.use(passUserToView);

// Routes
app.use('/', authRoutes);           // Handles /auth/login, /auth/register, etc.
app.use('/employees', employeesRoutes);

// Root redirect (landing page)
app.get('/', (req, res) => {
  if (req.session.user) return res.redirect('/employees');
  res.render('pages/landing');
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Orbit HCM running on http://localhost:${PORT}`));
