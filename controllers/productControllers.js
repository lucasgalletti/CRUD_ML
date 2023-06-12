const path = require('path');

const productModel = require('../models/product');

const controllers = {
    // @GET /products 
    getProducts: (req, res) => {
        const productos = productModel.findAll();
        res.render('productList', {
            title: 'Productos',
            productos
        });
    },

    // @GET /products 
    getUpdate: (req, res) => {
        const id = Number(req.params.id);

        const productoAModificar = productModel.findById(id)

        if (!productoAModificar) {
            // Con el return detenemos la ejecución del controller, y con el res.send enviamos un mensaje de error
            // *queremos detener la ejecución para que no se ejecute el otro res.render (la otra respuesta)
            return res.send('error de id');
        }

        res.render('updateProduct', { title: 'Editando', product: productoAModificar });
    },

    // @GET /products/:id/detail
    getProductDetail: (req, res) => {
        // Agarramos el ID que nos pasaron por parámetro de ruta, y lo convertimos en number
        const id = Number(req.params.id);

        // Buscamos en el array de productos, el producto cuyo ID coincida con el que nos enviaron por params
        const productoAMostrar = productModel.findById(id);
        let prodCatRoute = '';
        if(productoAMostrar.category == 'in-sale'){
             prodCatRoute = 'inSale/';
        }else{
            prodCatRoute = 'visited/';
        }
        // Si el producto no se encuentra (su id es inválido)
        if (!productoAMostrar) {
            // Con el return detenemos la ejecución del controller, y con el res.send enviamos un mensaje de error
            // *queremos detener la ejecución para que no se ejecute el otro res.render (la otra respuesta)
            return res.send('Ese producto no se encuentra disponible');
        }

        let finalPrice = (productoAMostrar.price - (productoAMostrar.price * productoAMostrar.discount/100)).toFixed(2);

        // Renderizamos la vista productDetail, y le pasamos los datos del producto solicitado
        res.render('productDetail', { title: 'Detalle', product: productoAMostrar, finalPrice, prodCatRoute });
    },

    // @DELETE /products/:id/delete
    deleteProduct: (req, res) => {
        const id = Number(req.params.id);
          
        productModel.deleteById(id);
        res.redirect('/products');

    },

    updateProduct: (req, res) => {
        const id = Number(req.params.id);
        const nuevosDatos = req.body;
        nuevosDatos.image = req.file ? req.file.filename : 'default-image.png';
        productModel.updateById(id, nuevosDatos);
        res.redirect('/');
    },

    // @GET /products/cart
    getCart: (req, res) => {
        res.render('cart', { title: 'Carrito' });
    },

    // @GET /products/create
    getCreate: (req, res) => {
        res.render('createProduct');
    },

    // @POST /products
    postProduct: (req, res) => {
        let datos = req.body;
        datos.price = Number(datos.price);
        datos.image = req.file ? req.file.filename : 'default-image.png',
        productModel.createOne(datos);

        res.redirect('/');
    }
}

module.exports = controllers;