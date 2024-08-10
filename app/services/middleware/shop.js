const shops = require('../../repositories/shops');

module.exports = {
  async getShop(req){
    try {
        let shop = await ShopRepo.find({id:  req.params.id})
        if(!shop) return { error: 404, msg: "data tidak ditemukan" }
        if(shop.deleted == true) return { error: 404, msg: "data tidak ditemukan" }
        req.shop = shop
        return {shop}
    } catch (error) {
        console.log(error);
        return { error: 400, msg: error ? error : "Bad request server function" }
    }
}
};
