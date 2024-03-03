/** @type {import('sequelize-cli').Migration} */
// Esta linha indica que este é um arquivo de migração do Sequelize

module.exports = {
  // Método 'up' define as alterações a serem aplicadas ao banco de dados
  async up(queryInterface, Sequelize) {
    // Cria a tabela "products" com as colunas e opções especificadas
    await queryInterface.createTable('products', {
      id: {
        type: Sequelize.INTEGER, // Tipo INTEGER para o ID do produto
        allowNull: false, // Não permite valores nulos
        autoIncrement: true, // Permite que o ID seja autoincrementado
        primaryKey: true, // Define o ID como chave primária
      },
      name: {
        type: Sequelize.STRING, // Tipo STRING para o nome do produto
        allowNull: false, // Não permite valores nulos
      },
      price: {
        type: Sequelize.INTEGER, // Tipo INTEGER para o preço do produto
        allowNull: false, // Não permite valores nulos
      },
      category: {
        type: Sequelize.STRING, // Tipo STRING para a categoria do produto
        allowNull: false, // Não permite valores nulos
      },
      path: {
        type: Sequelize.STRING, // Tipo STRING para o caminho da imagem do produto
        allowNull: false, // Não permite valores nulos
      },
      created_at: {
        type: Sequelize.DATE, // Tipo DATE para o momento da criação do registro
        allowNull: false, // Não permite valores nulos
      },
      updated_at: {
        type: Sequelize.DATE, // Tipo DATE para o momento da atualização do registro
        allowNull: false, // Não permite valores nulos
      },
    });
  },

  // Método 'down' define como desfazer as alterações feitas no método 'up'
  async down(queryInterface) {
    // Remove a tabela "products" do banco de dados
    await queryInterface.dropTable('products');
  },
};
