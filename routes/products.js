const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'public/images/products' })
const productsControllers = require('../controllers/productsControllers');

const { isLoggedIn } = require('../global');

router.get('/', isLoggedIn,  productsControllers.index);

router.get('/add', isLoggedIn,  productsControllers.add);

router.get('/edit/:id', isLoggedIn,  productsControllers.edit);

router.post('/', isLoggedIn,  upload.single('product-image'), isLoggedIn,  productsControllers.addPost);

router.post('/edit', isLoggedIn,  upload.single('product-image'), isLoggedIn,  productsControllers.editPost);

router.delete('/delete', isLoggedIn,  productsControllers.delete);

module.exports = router;