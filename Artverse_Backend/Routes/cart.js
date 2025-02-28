const express = require('express');
const { addToCart, getCart, removeFromCart, clearCart } = require('../Controllers/cartController');

const router = express.Router();

router.post('/add', addToCart);
router.get('/:userEmail', getCart);
router.post('/remove', removeFromCart);
router.post('/clear', clearCart);

module.exports = router;
