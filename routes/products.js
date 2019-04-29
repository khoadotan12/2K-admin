const express = require('express');
const router = express.Router();
const productsControllers = require('../controllers/productsControllers');

router.get('/', productsControllers.index);

router.get('/add', productsControllers.add);

module.exports = router;