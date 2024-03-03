// /** @type {import('sequelize-cli').Migration} */
// Esta linha indica que este é um arquivo de migração do Sequelize

module.exports = {
  // Método 'up' define as alterações a serem aplicadas ao banco de dados
  async up(queryInterface, Sequelize) {
    // Cria a tabela "users" com as colunas e opções especificadas
    await queryInterface.createTable("users", {
      id: {
        type: Sequelize.UUID, // Tipo UUID para o ID do usuário
        defaultValue: Sequelize.UUIDV4, // Valor padrão gerado usando UUIDV4
        allowNull: false, // Não permite valores nulos
        primaryKey: true, // Define o ID como chave primária
      },
      name: {
        type: Sequelize.STRING, // Tipo string para o nome do usuário
        allowNull: false, // Não permite valores nulos
      },
      email: {
        type: Sequelize.STRING, // Tipo string para o e-mail do usuário
        allowNull: false, // Não permite valores nulos
        unique: true, // Garante que cada e-mail seja único
      },
      password_hash: {
        type: Sequelize.STRING, // Tipo string para o hash da senha
        allowNull: false, // Não permite valores nulos
      },
      admin: {
        type: Sequelize.BOOLEAN, // Tipo booleano para indicar se o usuário é um administrador
        defaultValue: false, // Valor padrão é false (não administrador)
        allowNull: false, // Não permite valores nulos
      },
      created_at: {
        type: Sequelize.DATE, // Tipo de data para o momento da criação do registro
        allowNull: false, // Não permite valores nulos
      },
      updated_at: {
        type: Sequelize.DATE, // Tipo de data para o momento da atualização do registro
        allowNull: false, // Não permite valores nulos
      },
    });
  },

  // Método 'down' define como desfazer as alterações feitas no método 'up'
  async down(queryInterface) {
    // Remove a tabela "users" do banco de dados
    await queryInterface.dropTable("users");
  },
};
