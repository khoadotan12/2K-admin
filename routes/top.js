const express = require('express');
const router = express.Router();

const topControllers = require('../controllers/topControllers');

const { isLoggedIn } = require('../global');

router.get('/products', isLoggedIn, topControllers.products);

router.get('/brands', isLoggedIn, topControllers.brands);



module.exports = router;