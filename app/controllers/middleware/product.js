const midProduct = require('../../services/middleware/product');

module.exports = {
  getProduct(req, res, next) {
    midProduct.getProduct(req).then(data => {
        if (data.error) {
            res.status(data.error).json({ errors: [data.msg] })
            return
        } else {
            next()
        }
    }).catch(err => {
        res.status(400).json({ errors: [err] })
        return
    })
},
createProductForm(req, res, next) {
    if (
      req.body.image == undefined) {
      console.log(req.body);
      res.status(403).json({ errors: ['field foto Produk wajib diisi'] });
      return;
    }
    next();
  },
};
