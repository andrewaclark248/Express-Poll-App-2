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
    userName:  {
      type: DataTypes.STRING,
      validate: {
         isEmail: true
      }
  },
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    adminId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });

  User.associate = function(models) {
    User.hasMany(models.Poll)
    User.hasMany(models.UserPoll)
  };
  
  const ADMIN_ROLE = "Admin"
  const GENERAL_ROLE = "General"
  User.ADMIN_ROLE = ADMIN_ROLE
  User.GENERAL_ROLE = GENERAL_ROLE


  return User;
};