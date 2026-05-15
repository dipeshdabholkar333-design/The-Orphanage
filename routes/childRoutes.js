const express = require('express');
const router = express.Router();
const db = require('../config/db');


// SHOW ALL CHILDREN
router.get('/', (req, res) => {

    const sql = 'SELECT * FROM children';

    db.query(sql, (err, results) => {

        if (err) {
            console.log(err);
            return res.send('Database Error');
        }

        res.render('children/index', {
            children: results
        });

    });

});


// ADD PAGE
router.get('/add', (req, res) => {
    res.render('children/add');
});


// SAVE CHILD
router.post('/add', (req, res) => {

    const { name, age, gender, admission_date, health_status } = req.body;

    const sql = `
        INSERT INTO children
        (name, age, gender, admission_date, health_status)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [name, age, gender, admission_date, health_status],
        (err) => {

            if (err) {
                console.log(err);
                return res.send('Insert Error');
            }

            res.redirect('/children');

        }
    );

});


// EDIT PAGE
router.get('/edit/:id', (req, res) => {

    const sql = 'SELECT * FROM children WHERE id=?';

    db.query(sql, [req.params.id], (err, results) => {

        if (err) {
            console.log(err);
            return res.send('Database Error');
        }

        res.render('children/edit', {
            child: results[0]
        });

    });

});


// UPDATE CHILD
router.post('/update/:id', (req, res) => {

    const { name, age, gender, admission_date, health_status } = req.body;

    const sql = `
        UPDATE children
        SET name=?, age=?, gender=?, admission_date=?, health_status=?
        WHERE id=?
    `;

    db.query(
        sql,
        [name, age, gender, admission_date, health_status, req.params.id],
        (err) => {

            if (err) {
                console.log(err);
                return res.send('Update Error');
            }

            res.redirect('/children');

        }
    );

});


// DELETE CHILD
router.get('/delete/:id', (req, res) => {

    const sql = 'DELETE FROM children WHERE id=?';

    db.query(sql, [req.params.id], (err) => {

        if (err) {
            console.log(err);
            return res.send('Delete Error');
        }

        res.redirect('/children');

    });

});

module.exports = router;