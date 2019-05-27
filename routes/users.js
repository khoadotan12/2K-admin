const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/userControllers');

const { isLoggedIn } = require('../global');

/* GET users listing. */
router.get('/', isLoggedIn, userControllers.list);

router.get('/add', isLoggedIn, userControllers.add);

router.get('/edit/:id', isLoggedIn, userControllers.edit);

router.post('/add', isLoggedIn, userControllers.addPost);

router.post('/edit', isLoggedIn, userControllers.editPost);

router.post('/verifyEmail', isLoggedIn, userControllers.verifyEmail);

router.delete('/delete', isLoggedIn, userControllers.delete);

module.exports = router;
