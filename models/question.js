'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Question.init({
    name: DataTypes.STRING,
    answer: DataTypes.BOOLEAN,
    userPollId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Question',
  });
  Question.associate = function(models) {
    Question.belongsTo(models.UserPoll)
  };

  return Question;
};