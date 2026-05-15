const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const adminRoutes = require('./routes/adminRoutes');


const app = express(); // ✅ FIRST create app

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/', adminRoutes);


app.use(session({
    secret: 'secretkey',
    resave: false,
    saveUninitialized: true
}));

// EJS setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ROUTES (ALL AFTER app is created)
const publicRoutes = require('./routes/publicRoutes');
const authRoutes = require('./routes/authRoutes');
const childRoutes = require('./routes/childRoutes');
const donationRoutes = require('./routes/donationRoutes');
const staffRoutes = require('./routes/staffRoutes');
const expenseRoutes = require('./routes/expenseRoutes');

// PUBLIC ROUTES
app.use('/', publicRoutes);

// ADMIN ROUTES
app.use('/', authRoutes);
app.use('/children', childRoutes);
app.use('/donations', donationRoutes);
app.use('/staff', staffRoutes);
app.use('/expenses', expenseRoutes);

// SERVER
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});