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
    role: DataTypes.STRING,
    admin_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  User.associate = function(models) {
    User.hasMany(models.Questions, {
      foreignKey: {
        name: 'user_id'
      }
    })
    User.hasMany(models.Polls, {
      foreignKey: {
        name: 'user_id'
      }
    })
  };
  
  return User;
};