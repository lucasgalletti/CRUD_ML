const productModel = require('../models/product');

const controllers = {
    getIndex: (req, res) => {
        const products = productModel.findAll();

        res.render('index', {
            title: 'Home',
            products
        });
    }
}

module.exports = controllers;