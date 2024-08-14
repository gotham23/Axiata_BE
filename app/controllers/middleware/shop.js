const midShop = require('../../services/middleware/shop');

module.exports = {
  getShop(req, res, next) {
    midshop.getShop(req).then(data => {
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
createShopForm(req, res, next) {
    if (
      req.body.image == undefined) {
      console.log(req.body);
      res.status(403).json({ errors: ['field foto Toko wajib diisi'] });
      return;
    }
    next();
  },
};
