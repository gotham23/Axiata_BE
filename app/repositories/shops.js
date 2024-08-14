const {Shops} = require('../models')

module.exports = {
    create(args){
        return Shops.create(args)
    },
    getDetail(args){ 
        return Shops.findOne({where: args})
    },
    update(id, args) {
      return Shops.update(args, {
        where: { id }
      });
    },
    delete(shopId) {
      return Shops.destroy({ where: { id: shopId } });
    },
    
    findById(shopId) {
      return Shops.findOne({ where: { id: shopId } });
    },
    find(argsWhere) {
      console.log(argsWhere);
      return Shops.findOne({where: argsWhere, include: [{ all: true, nested: true }]})
  },
  findId(id) {
    return Shops.findOne({ where: { id } });
  },
    findAll(args) {
        return Shops.findAll({
          where: args,
          include: [{ all: true, nested: true }]
        });
      },
      findByUserId(userId) {a
        return Shops.findOne({ where: { user_id: userId } });
    },
};