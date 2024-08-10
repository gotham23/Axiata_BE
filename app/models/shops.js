const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Shops extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // this.belongsTo(models.Shops, {
      //   foreignKey: 'user_id',
      //   as: 'user',
      // });
      this.belongsTo(models.Users, {
        foreignKey: 'user_id',
        as: 'user'
      });
      this.belongsTo(models.Categories, {
        foreignKey: 'category',
        as: 'kategori'
      });
      this.hasMany(models.Products, {
        foreignKey: 'shop_id',
        as: 'product'
      });
    }
  }
  Shops.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      user_id: DataTypes.UUID,
      name: DataTypes.STRING,
      alamat: DataTypes.STRING,
      category: DataTypes.INTEGER,
      deleted: DataTypes.BOOLEAN,
      photo: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Shops',
    }
  );
  return Shops;
};