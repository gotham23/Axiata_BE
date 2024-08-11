const productService = require('../../../services/product');

module.exports = {
  async getAllProduct(req, res) {
    try {
      const result = await productService.findAll(req);
      if (result.error) {
        return res.status(result.error).json({ msg: result.msg });
      }
      return res.status(200).json(result.products); // Mengembalikan semua produk
    } catch (error) {
      return res.status(500).json({ msg: 'Internal Server Error' });
    }
  },

  async getProduct(req, res) {
    try {
      const result = await productService.findId(req);
      if (result.error) {
        return res.status(result.error).json({ msg: result.msg });
      }
      return res.status(200).json(result.product); // Mengembalikan produk tertentu berdasarkan ID
    } catch (error) {
      return res.status(500).json({ msg: 'Internal Server Error' });
    }
  },

  async createProduct(req, res) {
    try {
      const result = await productService.create(req);
      if (result.error) {
        return res.status(result.error).json({ msg: result.msg });
      }
      return res.status(201).json(result.product); // Mengembalikan produk yang baru dibuat
    } catch (error) {
      return res.status(500).json({ msg: 'Internal Server Error' });
    }
  },

  async updateProduct(req, res) {
    try {
      const data = await productService.update(req);
      if (data.success) {
        return res.status(200).json(data.update); // Mengembalikan produk yang telah diperbarui
      } else {
        return res.status(400).json({ errors: [data.error] });
      }
    } catch (err) {
      return res.status(500).json({ errors: [err.message] });
    }
  },

  async deleteProduct(req, res) {
    try {
      const data = await productService.deleteProduct(req);
      if (data.error) {
        return res.status(data.error).json({ errors: [data.msg] });
      } else {
        return res.status(200).json({ msg: 'Product deleted successfully' }); // Mengembalikan pesan sukses setelah penghapusan
      }
    } catch (err) {
      return res.status(500).json({ errors: [err.message] });
    }
  },
};
