const shopRepo = require('../repositories/shops');
const categoryRepo = require('../repositories/category');
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  async findAll(req) {
    try {
      let shop = JSON.parse(JSON.stringify(await shopRepo.findAll({ deleted: false })));
      return { shop };
    } catch (error) {
      console.log(error);
      return { error: 400, msg: error ? error : 'Bad request server function' };
    }
  },
  async getShop(req) {
    try {
      let shop = JSON.parse(JSON.stringify(await shopRepo.find({id: req.params.id,deleted: false,})));
      if (!shop) {
        return { error: 404, msg: 'Toko tidak ditemukan' };
      }
      return { shop };
    } catch (error) {
      console.log(error);
      return { error: 400, msg: error ? error : 'Bad request server function' };
    }
  },
  async create(req) {
    try {
      let args = {
        user_id: req.user.id,
        name: req.body.name,
        alamat: req.body.alamat,
        category: req.body.category,
        deleted: false,
        photo : '/user/avatar_default.png'
      };
      let categories = await categoryRepo.findId(args.category);
      if (categories == null ){
        return {error: 404, msg: 'Kategori tidak tersedia' }
      }
      if (!req.body.category) {
        return {error: 404, msg: 'harap masukan kategori toko' }  
      } 
          let toko = await shopRepo.create(args);
          return { toko };
        } catch (error) {
          console.log(error);
          return { error: 400, msg: error ? error : 'Bad request server function' };
        }
      },
      async update(req) {
        let args = {
          name: req.body.name,
          alamat: req.body.alamat,
          category: req.body.category,
          deleted: false,
        };
        try {
          let update = await shopRepo.update(req.params.id, args);
          return { success: true, update };
        } catch (error) {
          console.log(error);
          return { success: false, error: error.message };
        }
      },
      async deleteShop(req) {
        try {
          let deleted = await shopRepo.destroy({id: req.params.id});
          return { deleted };
        } catch (error) {
          console.log(error);
          return { error: 400, msg: error ? error : 'Bad request server function' };
        }
      }
 
};