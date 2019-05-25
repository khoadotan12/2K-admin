const express = require('express');
const router = express.Router();
const revenueControllers = require('../controllers/revenueControllers');

const { isLoggedIn } = require('../global');

router.get('/date', isLoggedIn, revenueControllers.date);

router.get('/week', isLoggedIn, revenueControllers.week);

router.get('/month', isLoggedIn, revenueControllers.month);

router.get('/quarter', isLoggedIn, revenueControllers.quarter);

router.get('/year', isLoggedIn, revenueControllers.year);


module.exports = router;