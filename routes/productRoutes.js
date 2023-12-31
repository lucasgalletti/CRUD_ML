const express = require('express');
const path = require('path');
const productControllers = require('../controllers/productControllers');
const uploadImg = require('../middlewares/productImg')
const router = express.Router();


// @GET /products 
router.get('/', productControllers.getProducts);

// @POST /products
router.post('/', uploadImg.single('image'), productControllers.postProduct);

// @GET /products/create
router.get('/create', productControllers.getCreate);

// @GET /products/:id/detail ---> /products/5/detail
router.get('/:id/detail', productControllers.getProductDetail);

// @DELETE /products/:id/delete ---> /products/5/delete
router.delete('/:id/delete', productControllers.deleteProduct);

// @GET /products/:id/update 
router.get('/:id/update', productControllers.getUpdate);

// @PUT /products/:id/update ---> /products/5/put
router.put('/:id/update', uploadImg.single('image'), productControllers.updateProduct);

// @GET /products/cart
router.get('/cart', productControllers.getCart);

module.exports = router;