

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
     await queryInterface.createTable('categories', { 
      
      id: {
        type: Sequelize.INTEGER, // Tipo INTEGER para o ID do produto
        allowNull: false, // Não permite valores nulos
        autoIncrement: true, // Permite que o ID seja autoincrementado
        primaryKey: true, // Define o ID como chave primária
      },
      name: {
        type: Sequelize.STRING, // Tipo STRING para o nome do produto
        allowNull: false, // Não permite valores nulos
        unique: true,
      },
      created_at: {
        type: Sequelize.DATE, // Tipo DATE para o momento da criação do registro
        allowNull: false, // Não permite valores nulos
      },
      updated_at: {
        type: Sequelize.DATE, // Tipo DATE para o momento da atualização do registro
        allowNull: false, // Não permite valores nulos
      },
    })
     
  },

   down: async (queryInterface) => {
    
     await queryInterface.dropTable('categories')
    
  },
}

