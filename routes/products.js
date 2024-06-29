const express = require('express');
const router = express.Router();

router.get('/products', productService.getAll);
router.get('/:id', productService.getOne);
router.post('/add', productService.add);
router.patch('/update', productService.update);
module.exports = router;