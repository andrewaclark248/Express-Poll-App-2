'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    return queryInterface.addColumn(
      'Polls', // name of Source model
      'user_id', // name of the key we're adding 
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users', // name of Target model
          key: 'id', // key in Target model that we're referencing
        }
      }
    )
      .then(() => {
        // Payment hasOne Order
        return queryInterface.addColumn(
          'Questions', // name of Target model
          'polls_id', // name of the key we're adding
          {
            type: Sequelize.INTEGER,
            references: {
              model: 'Polls', // name of Source model
              key: 'id',
            }
          }
        );
      });
      





  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
