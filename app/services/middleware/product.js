const product = require('../../repositories/products');

module.exports = {
  async getProduct(req){
    try {
        let product = await ProductRepo.find({id:  req.params.id})
        if(!product) return { error: 404, msg: "data tidak ditemukan" }
        if(product.deleted == true) return { error: 404, msg: "data tidak ditemukan" }
        req.product = product
        return {product}
    } catch (error) {
        console.log(error);
        return { error: 400, msg: error ? error : "Bad request server function" }
    }
}
};
