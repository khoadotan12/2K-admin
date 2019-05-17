const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' })
const productsControllers = require('../controllers/productsControllers');

router.get('/', productsControllers.index);

router.get('/add', productsControllers.add);

router.get('/edit/:id', productsControllers.edit);

router.post('/', upload.single('product-image'), productsControllers.addPost);

router.delete('/delete', productsControllers.delete);

module.exports = router;