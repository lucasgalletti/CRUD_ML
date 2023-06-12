const multer = require('multer');

const storage = multer.diskStorage({
    
    destination: (req, file, cb) => {
        let destino = '';
        if(req.body.category == 'visited'){
            destino = 'visited';
        }
        if(req.body.category == 'in-sale'){
            destino = 'inSale'
        }
        cb(null, `./public/images/products/${destino}`);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });

module.exports = upload;