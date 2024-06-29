const ProductsModel = require('../models/products');
const mongoose = require('mongoose');
const { getAll, getOne } = require('./productService');

module.exports = {
    getAll: ('/products', async (req, res) => {
        const { page = 1, limit = 10, name = '' } = req.query;
        const query = { name: { $regex: name, $options: 'i' } }; // Case-insensitive search by name
        try {
          const products = await Product.find(query)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();
          const count = await Product.countDocuments(query);
          res.json({
            products,
            totalPages: Math.ceil(count / limit),
            currentPage: page
          });
        } catch (err) {
          res.status(500).json({ message: err.message });
        }
      }),
      getOne: ('/products/:id', getProduct, (req, res) => {
        res.json(res.product);
      }),
      add: ('/products', async (req, res) => {
        const product = new Product(req.body);
        try {
          const newProduct = await product.save();
          res.status(201).json(newProduct);
        } catch (err) {
          res.status(400).json({ message: err.message });
        }
      }),
      update: ('/products/:id', getProduct, async (req, res) => {
        if (req.body.name != null) {
          res.product.name = req.body.name;
        }
        if (req.body.category != null) {
          res.product.category = req.body.category;
        }
        try {
          const updatedProduct = await res.product.save();
          res.json(updatedProduct);
        } catch (err) {
          res.status(400).json({ message: err.message });
        }
      }) 
}