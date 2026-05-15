const express = require('express');
const router = express.Router();


// ADMIN DASHBOARD
router.get('/dashboard', (req, res) => {

    res.render('dashboard');

});

module.exports = router;