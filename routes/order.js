const express = require('express');
const router = express.Router();
const orderControllers = require('../controllers/orderControllers');

router.get('/done', orderControllers.done);

router.get('/delivering', orderControllers.delivering);

router.get('/receive', orderControllers.receive);

router.get('/cancel', orderControllers.cancel);

router.put('/state', orderControllers.changeState);

module.exports = router;