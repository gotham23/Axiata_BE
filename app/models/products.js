const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Products extends Model {
    static associate(models) {
      this.belongsTo(models.Shops, {
        foreignKey: 'shop_id',
        as: 'detail_product'
      });      
    }
  }
  
  Products.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    shop_id: DataTypes.UUID,
    name: DataTypes.STRING,
    deskripsi: DataTypes.STRING,
    deleted: DataTypes.BOOLEAN,
    photo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Products',
  });

  return Products;
};