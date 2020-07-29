'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * return queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.addConstraint('Carts', {
      fields: ['UserId'],
      type: 'foreign key',
      name: 'FK_userId',
      references: { 
        table: 'Users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
    .then ( () =>{
      return queryInterface.addConstraint('Carts', {
        fields: ['ProductId'],
        type: 'foreign key',
        name: 'FK_productId',
        references: { 
          table: 'Products',
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      })
    })
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * return queryInterface.dropTable('users');
     */
    return queryInterface.removeConstraint('Carts', 'FK_userId')
    .then( () => {
      return queryInterface.removeConstraint('Carts', 'FK_productId')
    })
  }
};