const express = require('express');
const router = express.Router();
const db = require('../config/db');


// SHOW DONATIONS
router.get('/', (req, res) => {

    const sql = 'SELECT * FROM donations';

    db.query(sql, (err, results) => {

        if (err) {
            console.log(err);

            return res.send('Database Error');
        }

        // SEND DATA TO EJS
        res.render('donations/index', {
            donations: results
        });

    });

});


// ADD DONATION PAGE
router.get('/add', (req, res) => {

    res.render('donations/add');

});


// SAVE DONATION
router.post('/add', (req, res) => {

    const {
        donor_name,
        amount,
        donation_date
    } = req.body;

    const sql = `
        INSERT INTO donations
        (donor_name, amount, donation_date)
        VALUES (?, ?, ?)
    `;

    db.query(
        sql,
        [donor_name, amount, donation_date],
        (err) => {

            if (err) {
                console.log(err);

                return res.send('Insert Error');
            }

            res.redirect('/donations');

        }
    );

});

module.exports = router;