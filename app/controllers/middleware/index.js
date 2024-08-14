const { uploadHandler } = require('./fileHandler');
const auths = require('./user');
const {createShopForm} = require ('./shop')
const {createProductForm} = require ('./product')


module.exports = {
   auths, uploadHandler, createShopForm, createProductForm
}