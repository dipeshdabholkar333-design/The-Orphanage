const express = require('express');
const router = express.Router();
const db = require('../config/db');

// HOME PAGE
router.get('/', (req, res) => {
    res.render('public/home');
});

// ABOUT PAGE
router.get('/about', (req, res) => {
    res.render('public/about');
});

// DONATION PAGE
router.get('/donate', (req, res) => {
    res.render('public/donate');
});

// SAVE DONATION (PUBLIC FORM)
router.post('/donate', (req, res) => {

    const { donor_name, amount } = req.body;

    const sql = `
        INSERT INTO donations (donor_name, amount, donation_date)
        VALUES (?, ?, CURDATE())
    `;

    db.query(sql, [donor_name, amount], (err) => {
        if (err) {
            console.log(err);
            return res.send('Donation Failed');
        }

        res.send("Thank you for your donation!");
    });

});


// CONTACT PAGE
router.get('/contact', (req, res) => {
    res.render('public/contact');
});

// HANDLE FORM
router.post('/contact', (req, res) => {

    const { name, email, phone, message } = req.body;

    console.log("Contact Form Data:", name, email, phone, message);

    res.send("Thank you for contacting us! We will reply soon.");
});

module.exports = router;