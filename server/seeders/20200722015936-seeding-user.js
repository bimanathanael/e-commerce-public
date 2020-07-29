'use strict';

const { encrypt } = require('../helpers/bcrypt')

module.exports = {
  up: (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   return queryInterface.bulkInsert('Users', [{
       email: 'admin@mail.com',
       password: encrypt("admin"),
       role: "admin",
       createdAt: new Date(),
       updatedAt: new Date(),
     }], {});
   
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('Users', null, {});
     */
    return queryInterface.bulkDelete('Users', null, {});
  }
};
