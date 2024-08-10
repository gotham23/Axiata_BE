const shopService = require('../../../services/shop');

module.exports = {
  async getAllShop(req, res) {
    const result = await shopService.findAll(req);
    if (result.error) {
      return res.status(result.error).json({ msg: result.msg });
    }
    return res.json(result.shop);
  },

  async getShop(req, res) {
    const result = await shopService.getShop(req);
    if (result.error) {
      return res.status(result.error).json({ msg: result.msg });
    }
    return res.json(result.shop);
  },

  async createShop(req, res) {
    const result = await shopService.create(req);
    if (result.error) {
      return res.status(result.error).json({ msg: result.msg });
    }
    return res.status(201).json(result.shop);
  },
  updateShop(req, res) {
    shopService.update(req).then(data => {
      if (data.success) {
        res.status(200).json(data.update);
      } else {
        res.status(400).json({ errors: [data.error] });
      }
    }).catch(err => {
      res.status(400).json({ errors: [err] });
    });
  },
  deleteShop(req, res){
    shopService.deleteShop(req).then(data => {
        if(data.error){
            res.status(data.error).json({errors: [data.msg]})
        }else{
            res.status(200).json(data)
        }
    }).catch(err => {
        res.status(400).json({errors: [err]})
    })
},
};
