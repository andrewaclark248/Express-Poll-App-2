'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Polls extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Polls.init({
    name: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    original_poll_id: DataTypes.INTEGER,
    run_number: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Polls',
  });
  Polls.associate = function(models) {
    Polls.hasMany(models.Questions)
    Polls.belongsTo(models.User, {
        foreignKey: {
          name: 'user_id'
        }
      })
  };
  

  return Polls;
};