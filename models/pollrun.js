'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PollRun extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  PollRun.init({
    pollId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PollRun',
  });
  PollRun.associate = function(models) {
    PollRun.belongsTo(models.Poll)
    PollRun.hasMany(models.UserPoll)
  };

  return PollRun;
};