const multer = require("multer");
const path = require('path');

const pubDir = path.join(__dirname, '../../../bin/public')

const fnSetup = (pathDir) => {
    return multer.diskStorage({
        destination : function(req, file, callback){
                req.pathDir = pathDir
               callback(null, path.join(pubDir, pathDir));
        },
        filename : function(req, file, callback){
            const uniqueIdentifier = Date.now() + '_' + Math.round(Math.random() * 1E9);
               console.log(file);
               callback(null, '_' + file.fieldname + '_' + uniqueIdentifier + path.extname(file.originalname));
         }
    })
}

    


const uploadUser = multer({storage: fnSetup('user')});
const uploadShop = multer({storage: fnSetup('shop')});
const uploadProduct = multer({storage: fnSetup('product')});

module.exports = {
    uploadUser, uploadShop, uploadProduct
}