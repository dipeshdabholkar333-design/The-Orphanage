const express = require('express');
const router = express.Router();
const db = require('../config/db');


// SHOW EXPENSES
router.get('/', (req, res) => {

    const sql = 'SELECT * FROM expenses';

    db.query(sql, (err, results) => {

        if (err) {
            console.log(err);

            return res.send('Database Error');
        }

        // SEND DATA TO EJS
        res.render('expenses/index', {
            expenses: results
        });

    });

});


// ADD EXPENSE PAGE
router.get('/add', (req, res) => {

    res.render('expenses/add');

});


// SAVE EXPENSE
router.post('/add', (req, res) => {

    const {
        expense_name,
        amount,
        expense_date
    } = req.body;

    const sql = `
        INSERT INTO expenses
        (expense_name, amount, expense_date)
        VALUES (?, ?, ?)
    `;

    db.query(
        sql,
        [expense_name, amount, expense_date],
        (err) => {

            if (err) {
                console.log(err);

                return res.send('Insert Error');
            }

            res.redirect('/expenses');

        }
    );

});

module.exports = router;