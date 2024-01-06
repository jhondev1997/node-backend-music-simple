const  multer = require('multer'); //* sirver para trabajar con los archivos
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        const pathStorage = `${__dirname}/../storage`;
        cb(null, pathStorage);
    },
    filename: function(req, file, cb){
        const ext = file.originalname.split('.').pop();
        const filename = `file-${Date.now()}.${ext}`;
        cb(null, filename);

    }
});

const uploadMiddleware = multer({storage}); /**SIEMPRE TIENE QUE HABER UN uploadMIddleware */
/*
*
*/

module.exports = uploadMiddleware;