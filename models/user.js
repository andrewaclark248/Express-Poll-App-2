'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    user_name: DataTypes.STRING,
    password_hash: DataTypes.STRING,
    salt: DataTypes.STRING,
    email: DataTypes.STRING,
    email_confirmed: DataTypes.TINYINT,
    mobile_phone: DataTypes.STRING,
    mobile_phone_confirmed: DataTypes.STRING,
    two_factor_enabled: DataTypes.TINYINT,
    access_failed_count: DataTypes.INTEGER,
    access_failed_count: DataTypes.INTEGER,
    lockout_end: DataTypes.DATE,
    lockout_enabled: DataTypes.TINYINT
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};