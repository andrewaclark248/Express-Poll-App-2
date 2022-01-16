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
    userId: DataTypes.INTEGER,
    pollRunId: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'UserPoll',
  });

  UserPoll.associate = function(models) {
    UserPoll.belongsTo(models.PollRun)
    UserPoll.hasMany(models.Question)
    UserPoll.belongsTo(models.User)
  };
  const NOT_STARTED = "Not Started";
  const IN_PROGRESS = "In Progress";
  const FINISHED = "Finished"
  UserPoll.NOT_STARTED = NOT_STARTED
  UserPoll.IN_PROGRESS = IN_PROGRESS
  UserPoll.FINISHED = FINISHED
  
  return UserPoll;
};




