'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserPoll extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  UserPoll.init({
    user_id: DataTypes.INTEGER,
    poll_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserPoll',
  });

  UserPoll.associate = function(models) {
    UserPoll.belongsTo(models.Poll, {
      foreignKey: {
        name: 'poll_id'
      }
    })
    UserPoll.belongsTo(models.User, {
      foreignKey: {
        name: 'user_id'
      }
    })
    UserPoll.hasMany(models.Question, {
      foreignKey: {
        name: 'poll_id'
      }
    })
  };
  return UserPoll;
};