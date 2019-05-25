const homeControllers = require('../controllers/homeControllers');
const express = require('express');
const router = express.Router();
const passport = require('passport');

/* GET home page. */
router.get('/', isLoggedIn, homeControllers.home);

router.get('/login', isUnLoggedIn, homeControllers.loginGet);

router.post('/login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login',  failureFlash: true }));

module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
}

function isUnLoggedIn(req, res, next) {
    if (req.isUnauthenticated())
        return next();
    res.redirect('/');
}