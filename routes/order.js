const express = require('express');
const router = express.Router();
const orderControllers = require('../controllers/orderControllers');

const { isLoggedIn } = require('../global');

router.get('/done', isLoggedIn, orderControllers.done);

router.get('/add', isLoggedIn, orderControllers.add);

router.post('/', isLoggedIn, orderControllers.addPost);

router.get('/delivering', isLoggedIn, orderControllers.delivering);

router.get('/receive', isLoggedIn, orderControllers.receive);

router.get('/cancel', isLoggedIn, orderControllers.cancel);

router.put('/state', isLoggedIn, orderControllers.changeState);

module.exports = router;