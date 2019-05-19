const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/userControllers');

/* GET users listing. */
router.get('/', userControllers.list);

router.get('/add', userControllers.add);

router.get('/edit/:id', userControllers.edit);

router.post('/add', userControllers.addPost);

router.post('/edit', userControllers.editPost);

router.delete('/delete', userControllers.delete);

module.exports = router;
