const fs = require('node:fs');
const path = require('path');

const pubDir = path.join(__dirname, '../../../bin/public');
const pubDir2 = path.join(__dirname, '../../../bin/public');
const pubDir3 = path.join(__dirname, '../../../bin/public');

const isImageOrPdf = (mimetype) => {
    const allowedTypes = ["image/png", "image/jpg", "image/jpeg", "application/pdf"];
    return allowedTypes.includes(mimetype);
};

const handleFileRemoval = (filePath, errorCallback) => {
    fs.rm(filePath, (err) => {
        if (err) {
            console.log(err);
            if (errorCallback) errorCallback(err);
        }
    });
};

const setDefaultImage = (req, pathDir) => {
    if (req.pathDir === pathDir) {
        req.body.image = `/${pathDir}/${req.file.filename}`;
        req.msg = "New uploaded file success";
    }
};

const uploadHandler = (req, res, next) => {
    if (req.file) {
        const { mimetype } = req.file;

        if (isImageOrPdf(mimetype)) {
            if ((req.user === undefined && req.pathDir === "user") ||
                (req.shop === undefined && req.pathDir === "shop")||
                (req.product === undefined && req.pathDir === "product")) {
                setDefaultImage(req, req.pathDir);
            } else {
                if (req.pathDir === "user") {
                    handleFileRemoval(path.join(pubDir2, req.user.photo));
                } else if (req.pathDir === "shop") {
                    handleFileRemoval(path.join(pubDir, req.shop.logo_shop));
                }else if (req.pathDir === "product") {
                    handleFileRemoval(path.join(pubDir, req.product.logo_product));
                }
                setDefaultImage(req, req.pathDir);
            }
        } else {
            req.msg = "Uploaded file must be image/jpg/png or PDF";
        }
    } else {
        const defaultImage = req.pathDir === "user" ? "" : undefined;
        req.body.image = req[req.pathDir] ? req[req.pathDir].photo : defaultImage;
        req.msg = "No uploaded file detected";
    }

    next();
};

module.exports = {
    uploadHandler
};