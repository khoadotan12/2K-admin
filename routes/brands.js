const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'public/images/brands' });
const brandsController = require('../controllers/brandsControllers');

const { isLoggedIn } = require('../global');

router.get('/', isLoggedIn, brandsController.index);

router.get('/add', isLoggedIn, brandsController.add);

router.post('/add', isLoggedIn, upload.single('brand-image'), brandsController.addPost);

router.get('/edit/:id', isLoggedIn, brandsController.edit);

router.post('/edit', isLoggedIn, upload.single('brand-image'), brandsController.editPost);

router.delete('/delete', isLoggedIn, brandsController.delete);

module.exports = router;