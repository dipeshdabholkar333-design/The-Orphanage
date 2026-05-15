const express = require('express');
const router = express.Router();
const db = require('../config/db');


// SHOW STAFF
router.get('/', (req, res) => {

    db.query('SELECT * FROM staff', (err, results) => {

        if (err) {
            console.log(err);
            return res.send('Database Error');
        }

        res.render('staff/index', {
            staff: results
        });

    });

});


// ADD PAGE
router.get('/add', (req, res) => {
    res.render('staff/add');
});


// SAVE STAFF
router.post('/add', (req, res) => {

    const { name, position, salary } = req.body;

    const sql = `
        INSERT INTO staff
        (name, position, salary)
        VALUES (?, ?, ?)
    `;

    db.query(sql, [name, position, salary], (err) => {

        if (err) {
            console.log(err);
            return res.send('Insert Error');
        }

        res.redirect('/staff');

    });

});


// EDIT PAGE
router.get('/edit/:id', (req, res) => {

    db.query(
        'SELECT * FROM staff WHERE id=?',
        [req.params.id],
        (err, results) => {

            if (err) {
                console.log(err);
                return res.send('Database Error');
            }

            res.render('staff/edit', {
                staff: results[0]
            });

        }
    );

});


// UPDATE STAFF
router.post('/update/:id', (req, res) => {

    const { name, position, salary } = req.body;

    const sql = `
        UPDATE staff
        SET name=?, position=?, salary=?
        WHERE id=?
    `;

    db.query(
        sql,
        [name, position, salary, req.params.id],
        (err) => {

            if (err) {
                console.log(err);
                return res.send('Update Error');
            }

            res.redirect('/staff');

        }
    );

});


// DELETE STAFF
router.get('/delete/:id', (req, res) => {

    db.query(
        'DELETE FROM staff WHERE id=?',
        [req.params.id],
        (err) => {

            if (err) {
                console.log(err);
                return res.send('Delete Error');
            }

            res.redirect('/staff');

        }
    );

});

module.exports = router;