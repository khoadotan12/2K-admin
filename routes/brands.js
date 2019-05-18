const express = require('express');
const router = express.Router();
const brandsController = require('../controllers/brandsControllers');

router.get('/', brandsController.index);

router.get('/add', brandsController.add);

router.post('/add', brandsController.addPost);

router.get('/edit/:id', brandsController.edit);

router.post('/edit', brandsController.editPost);

router.delete('/delete', brandsController.delete);

module.exports = router;