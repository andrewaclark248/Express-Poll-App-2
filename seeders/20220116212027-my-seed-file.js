'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    var date = new Date(12, 7, 5, 7, 5, 34, 34);
     await queryInterface.bulkInsert('Users', [{
        userName: 'adminuser@gmail.com',
        password: "Password1",
        role: "Admin",
        createdAt: date,
        updatedAt: date
      }], {});
    
  },

  down: async (queryInterface, Sequelize) => {

  }
};
