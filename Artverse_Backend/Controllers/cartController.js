const Cart = require('../Models/cart');

exports.addToCart = async (req, res) => {
  const { userEmail, title, name, price, quantity, image } = req.body;

  try {
      // Find or create cart
      let cart = await Cart.findOne({ userEmail });
      if (!cart) {
          cart = new Cart({ userEmail, items: [] });
      }

      console.log('Request Body:', req.body);
      console.log('Existing Cart:', cart);

      // Check for existing item
      const existingItem = cart.items.find(item => item.title === title && (!name || item.name === name));

      if (existingItem) {
          existingItem.quantity += quantity; // Increment quantity
      } else {
          // Add a new item
          cart.items.push({ title, name, price, quantity, image });
      }

      // Save the cart
      await cart.save();
      console.log('Updated Cart:', cart);

      res.status(200).json(cart);
  } catch (error) {
      res.status(500).json({ error: 'Failed to add item to cart', details: error.message });
  }
};


// Get cart items
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userEmail: req.params.userEmail });
    res.status(200).json(cart || { items: [] });
  } catch (err) {
    res.status(500).json({ error: 'Error fetching cart' });
  }
};

// Remove from cart
exports.removeFromCart = async (req, res) => {
  const { userEmail, productId } = req.body;

  try {
    const cart = await Cart.findOne({ userEmail });
    if (cart) {
      cart.items = cart.items.filter(item => item.productId !== productId);
      await cart.save();
    }
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ error: 'Error removing from cart' });
  }
};

// Clear cart
exports.clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOneAndDelete({ userEmail: req.body.userEmail });
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ error: 'Error clearing cart' });
  }
};
