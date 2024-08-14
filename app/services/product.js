// services/product.js
const productsRepo = require('../repositories/products');
const shopRepo = require('../repositories/shops');
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  async findAll(req) {
    try {
      let products = JSON.parse(JSON.stringify(await productsRepo.findAll({ deleted: false })));
      return { products };
    } catch (error) {
      console.log(error);
      return { error: 400, msg: error ? error : 'Bad request server function' };
    }
  },
  async findId(req) {
    try {
      let product = await productsRepo.getDetail({ id: req.params.id, deleted: false });
      if (!product) {
        return { error: 404, msg: 'Product not found' };
      }
      return { product: JSON.parse(JSON.stringify(product)) };
    } catch (error) {
      console.log(error);
      return { error: 400, msg: 'Bad request server function' };
    }
  },

  async create(req) {
    try {
      let args = {
        shop_id: req.body.shop_id,
        name: req.body.name,
        deskripsi: req.body.deskripsi,
        deleted: false,
        photo: req.body.image
      };
      
      let shop = await shopRepo.findById(args.shop_id);
      if (!shop) {
        return { error: 404, msg: 'Toko tidak tersedia' };
      }

      let product = await productsRepo.create(args);
      return { product };
    } catch (error) {
      console.log(error);
      return { error: 400, msg: 'Bad request server function' };
    }
  },
  async update(req) {
    let args = {
      name: req.body.name,
      deskripsi: req.body.deskripsi,
      deleted: false,
    };
    try {
      let update = await productsRepo.update(req.params.id, args);
      return { success: true, update };
    } catch (error) {
      console.log(error);
      return { success: false, error: error.message };
    }
  },
  async deleteProduct(req) {
    try {
      const productId = req.params.id;
          const product = await productsRepo.findById(productId);
          if (!product) {
            return { error: 404, msg: 'product tidak ditemukan' };
          }
          await productsRepo.delete(productId);
          return { msg: 'product berhasil dihapus'  };
    } catch (error) {
      console.log(error);
      return { error: 400, msg: error ? error : 'Bad request server function' };
    }
  }
};
