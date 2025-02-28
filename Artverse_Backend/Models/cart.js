const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userEmail: { type: String, required: true },
    items: [
        {
            title: { type: String, required: true },
            name: { type: String },
            price: { type: Number, required: true },
            quantity: { type: Number, required: true },
            image: { type: String, required: true },
        },
    ],
});

module.exports = mongoose.model('Cart', cartSchema);
