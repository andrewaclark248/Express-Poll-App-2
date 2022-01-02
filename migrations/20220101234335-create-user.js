'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_name: {
        type: Sequelize.STRING
      },
      password_hash: {
        type: Sequelize.STRING
      },
      salt: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      email_confirmed: {
        type: Sequelize.TINYINT
      },
      mobile_phone: {
        type: Sequelize.STRING
      },
      mobile_phone_confirmed: {
        type: Sequelize.STRING
      },
      two_factor_enabled: {
        type: Sequelize.TINYINT
      },
      access_failed_count: {
        type: Sequelize.INTEGER
      },
      access_failed_count: {
        type: Sequelize.INTEGER
      },
      lockout_end: {
        type: Sequelize.DATE
      },
      lockout_enabled: {
        type: Sequelize.TINYINT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};