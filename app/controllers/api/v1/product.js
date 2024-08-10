const productService = require('../../../services/product');

module.exports = {
  async getAllProduct(req, res) {
    const result = await productService.findAll(req);
    if (result.error) {
      return res.status(result.error).json({ msg: result.msg });
    }
    return res.json(result.shop);
  },


  async getProduct(req, res) {
    const result = await productService.findId(req);
    if (result.error) {
      return res.status(result.error).json({ msg: result.msg });
    }
    return res.json(result.shop);
  },

  async createProduct(req, res) {
    const result = await productService.create(req);
    if (result.error) {
      return res.status(result.error).json({ msg: result.msg });
    }
    return res.status(201).json(result.product);
  },
  async updateProduct(req, res) {
    productService.update(req).then(data => {
      if (data.success) {
        res.status(200).json(data.update);
      } else {
        res.status(400).json({ errors: [data.error] });
      }
    }).catch(err => {
      res.status(400).json({ errors: [err] });
    });
  },
 async deleteProduct(req, res){
    productService.deleteProduct(req).then(data => {
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
