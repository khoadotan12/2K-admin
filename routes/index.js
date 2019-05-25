const homeControllers = require('../controllers/homeControllers');
const express = require('express');
const router = express.Router();
const passport = require('passport');
const { isUnLoggedIn, isLoggedIn } = require('../global');

/* GET home page. */
router.get('/', isLoggedIn, homeControllers.home);

router.get('/login', isUnLoggedIn, homeControllers.loginGet);

router.post('/login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login', failureFlash: true }));

router.get('/logout', homeControllers.logout);

module.exports = router;

