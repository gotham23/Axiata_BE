const { Products } = require('../models');

module.exports = {
  create(args) {
    return Products.create(args);
  },
  getDetail(args) {
    return Products.findOne({ where: args });
  },
  update(id, args) {
    return Products.update(args, { where: { id } });
  },
  destroy(args) {
    return Products.destroy({ where: args });
  },
  find(argsWhere) {
    return Products.findOne({
      where: argsWhere,
      include: [{ all: true, nested: true }]
    });
  },
  findAll(args) {
    return Products.findAll({
      where: args,
      include: [{ all: true, nested: true }]
    });
  },
  getDetail(args) {
    return Products.findOne({ where: args });
  },
};