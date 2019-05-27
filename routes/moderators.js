const express = require('express');
const router = express.Router();
const moderatorControllers = require('../controllers/modControllers');

const { isLoggedIn } = require('../global');

/* GET users listing. */
router.get('/', isLoggedIn, moderatorControllers.list);

router.get('/add', isLoggedIn, moderatorControllers.add);

router.get('/edit/:id', isLoggedIn, moderatorControllers.edit);

router.post('/add', isLoggedIn, moderatorControllers.addPost);

router.post('/edit', isLoggedIn, moderatorControllers.editPost);

router.delete('/delete', isLoggedIn, moderatorControllers.delete);

module.exports = router;
