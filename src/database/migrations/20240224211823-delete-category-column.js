

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.removeColumn('products', 'category');
    
  },

  async down (queryInterface, Sequelize) {
    
      await queryInterface.createColumn('products', {
        category: {
          type: Sequelize.STRING, // Tipo STRING para a categoria do produto
          allowNull: false, // Não permite valores nulos
        }
      } );
    }
};
