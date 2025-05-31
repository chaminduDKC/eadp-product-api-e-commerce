const express = require('express');
const router = express.Router();
const CartController = require('../controller/CartController');

router.post('/create-cart', CartController.createCartRecord);
router.put('/update-cart/:id', CartController.updateCartRecord);
router.delete('/delete-cart/:id', CartController.deleteCartRecord);
router.get('/find-cart-by-id/:id', CartController.findCartById);
router.get('/find-all-carts', CartController.findAllCartRecords);

module.exports = router;