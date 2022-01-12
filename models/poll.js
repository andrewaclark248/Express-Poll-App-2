'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Poll extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Poll.init({
    user_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    original_poll_id: DataTypes.INTEGER,
    run_number: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Poll',
  });
  Poll.associate = function(models) {
    Poll.hasMany(models.Question, {
      foreignKey: {
        name: 'poll_id'
      }
    })
    Poll.hasMany(models.UserPoll, {
      foreignKey: {
        name: 'poll_id'
      }
    })
    Poll.belongsTo(models.User, {
      foreignKey: {
        name: 'user_id'
      }
    })
  };
  
  return Poll;
};