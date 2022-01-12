'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserPolls extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  UserPolls.init({
    poll_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserPolls',
  });

  UserPolls.associate = function(models) {
    UserPolls.belongsTo(models.User, {
      foreignKey: {
        name: 'user_id'
      }
    })
    UserPolls.belongsTo(models.Polls, {
      foreignKey: {
        name: 'polls_id'
      }
    })
    UserPolls.hasMany(models.Questions, {
      foreignKey: {
        name: 'polls_id'
      }
    })
  };
  return UserPolls;
};