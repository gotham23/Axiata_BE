'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Shops, {
        foreignKey: 'user_id',
        as: 'shop'
      })
     }
  }
  Users.init({
    id:  {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    nik: DataTypes.STRING,
    password: DataTypes.STRING,
    g_id: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    access_level: DataTypes.INTEGER,
    deleted: DataTypes.BOOLEAN,
    photo: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};