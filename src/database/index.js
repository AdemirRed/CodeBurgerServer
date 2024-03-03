/* eslint-disable import/no-extraneous-dependencies */
// eslint-disable-next-line import/no-extraneous-dependencies
// Desativa a verificação de dependências externas para este arquivo (seja para ESLint ou outra ferramenta de linting)

// Importa o Sequelize
import Sequelize from "sequelize";
import mongoose from "mongoose";

// Importa o modelo de usuário
import User from "../app/models/User";

// Importa as configurações do banco de dados
import configDatabase from "../config/database";
import Products from "../app/models/Product";
import Category from "../app/models/Category";

// Array contendo todos os modelos do banco de dados
const models = [User, Products, Category];

// Classe responsável por inicializar e configurar o banco de dados
class Database {
  constructor() {
    this.init(); // Chama o método de inicialização na criação de uma instância de Database
    this.mongo();
  }

  // Método para inicializar o banco de dados
  init() {
    // Cria uma nova conexão com o banco de dados usando as configurações fornecidas
    this.connection = new Sequelize(configDatabase);

    // Inicializa cada modelo do banco de dados com a conexão estabelecida
    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }

  mongo() {
    this.mongoConnection = mongoose.connect(
      "mongodb://192.168.0.200:27017/codeburger"
    );
  }
}

// Exporta uma instância da classe Database
export default new Database();

// http://192.168.0.200:3300/file-product/"imgURL"
