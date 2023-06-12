const express = require('express');
const path = require('path');
const methodOverride = require('method-override');

const mainRoutes = require('./routes/mainRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();

app.set('view engine', 'ejs');

app.set('views', [
    path.join(__dirname, './views/main'),
    path.join(__dirname, './views/products')
]);


// --- Middlewares ---
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/* --- Routers --- */
app.use(mainRoutes);
app.use('/products', productRoutes);

app.use((req,res,next)=>{
    res.status(404).render('error404');
  });

app.listen(3001, () => {
    console.log('Servidor escuchando en el puerto http://localhost:3001');
});