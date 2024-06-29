const teachermodel = require('../models/teachers');
const mongoose = require('mongoose');
const { getAll, getOne } = require('./');

module.exports = {
    getAll: ('/teachers', async (req, res) => {
        const { page = 1, limit = 10, name = '' } = req.query;
        const query = { name: { $regex: name, $options: 'i' } }; // Case-insensitive search by name
        try {
          const teachers = await Product.find(query)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();
          const count = await Product.countDocuments(query);
          res.json({
            teachers,
            totalPages: Math.ceil(count / limit),
            currentPage: page
          });
        } catch (err) {
          res.status(500).json({ message: err.message });
        }
      }),
      getOne: ('/teachers/:id', getProduct, (req, res) => {
        res.json(res.product);
      }),
      add: ('/teachers', async (req, res) => {
        const product = new Product(req.body);
        try {
          const newProduct = await product.save();
          res.status(201).json(newProduct);
        } catch (err) {
          res.status(400).json({ message: err.message });
        }
      }),
      update: ('/teachers/:id', getProduct, async (req, res) => {
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
      }),
      delete: async (req, res) => {
        try {
            await teachermodel.deleteOne({ _id: req.params.id });
            res.json({ success: true });
        } catch (error) {
            res.status(500).json(error);
        }
    } 
}