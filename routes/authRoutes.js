const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/admin', (req, res) => {
    res.render('login');
});

router.post('/login', (req, res) => {

    const { username, password } = req.body;

    const sql =
        'SELECT * FROM admins WHERE username = ? AND password = ?';

    db.query(sql, [username, password], (err, result) => {

        // CHECK DATABASE ERROR
        if (err) {
            console.log(err);
            return res.send('Database Error');
        }

        // CHECK USER FOUND
        if (result.length > 0) {

            req.session.user = username;

            res.redirect('/dashboard');

        } else {

            res.send('Invalid Username or Password');

        }

    });

});

router.get('/dashboard', (req, res) => {

    if (!req.session.user) {
        return res.redirect('/');
    }

    res.render('dashboard');

});

router.get('/logout', (req, res) => {

    req.session.destroy();

    res.redirect('/');

});

module.exports = router;