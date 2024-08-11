const shopService = require('../../../services/shop');

module.exports = {
  async getAllShop(req, res) {
    try {
      const result = await shopService.findAll(req);
      if (result.error) {
        return res.status(result.error).json({ msg: result.msg });
      }
      return res.status(200).json(result.shop); 
    } catch (error) {
      return res.status(500).json({ msg: 'Internal Server Error' });
    }
  },

  async getShop(req, res) {
    try {
      const result = await shopService.getShop(req);
      if (result.error) {
        return res.status(result.error).json({ msg: result.msg });
      }
      return res.status(200).json(result.shop); // Mengembalikan shop tertentu berdasarkan ID
    } catch (error) {
      return res.status(500).json({ msg: 'Internal Server Error' });
    }
  },

  async createShop(req, res) {
    try {
      const result = await shopService.create(req);
      if (result.error) {
        return res.status(result.error).json({ msg: result.msg });
      }
      return res.status(201).json(result.product); 
    } catch (error) {
      return res.status(500).json({ msg: 'Internal Server Error' });
    }
  },

  async updateShop(req, res) {
    try {
      const data = await shopService.update(req);
      if (data.success) {
        return res.status(200).json(data.update); // Mengembalikan shop yang diperbarui
      } else {
        return res.status(400).json({ errors: [data.error] });
      }
    } catch (err) {
      return res.status(500).json({ errors: [err.message] });
    }
  },

  async deleteShop(req, res) {
    try {
      const data = await shopService.deleteShop(req);
      if (data.error) {
        return res.status(data.error).json({ errors: [data.msg] });
      } else {
        return res.status(200).json({ msg: 'Shop deleted successfully' }); // Mengembalikan pesan sukses setelah penghapusan
      }
    } catch (err) {
      return res.status(500).json({ errors: [err.message] });
    }
  },
};
