const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    warehouses: [{
        warehouseName: { type: String },
        stock: { type: Number }
    }],
    status: { type: String, enum: ['on sale', 'not on sale']},
    characteristics: { type: String }

}, {
    collection: 'products',
    timestamps: true,
    read: 'nearest',
    writeConcern: {
        w: 'majority',
        j: true,
        wtimeoutMS: 30000
    }
});

const Model = mongoose.model('Products', productSchema);
module.exports = Model;