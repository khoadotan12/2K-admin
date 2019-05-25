const express = require('express');
const router = express.Router();
const brandsController = require('../controllers/brandsControllers');

const { isLoggedIn } = require('../global');

router.get('/', isLoggedIn,  brandsController.index);

router.get('/add', isLoggedIn,  brandsController.add);

router.post('/add', isLoggedIn,  brandsController.addPost);

router.get('/edit/:id', isLoggedIn,  brandsController.edit);

router.post('/edit', isLoggedIn,  brandsController.editPost);

router.delete('/delete', isLoggedIn,  brandsController.delete);

module.exports = router;