const express = require('express');
const router = express.Router();
const multer = require('multer');

const productsControllers = require('../controllers/productsControllers');

const { isLoggedIn, imageTempPath } = require('../global');

const upload = multer({ dest: imageTempPath });

router.get('/', isLoggedIn, productsControllers.index);

router.get('/add', isLoggedIn, productsControllers.add);

router.get('/edit/:id', isLoggedIn, productsControllers.edit);

router.post('/', isLoggedIn, upload.single('product-image'), productsControllers.addPost);

router.post('/edit', isLoggedIn, upload.single('product-image'), productsControllers.editPost);

router.delete('/delete', isLoggedIn, productsControllers.delete);

module.exports = router;