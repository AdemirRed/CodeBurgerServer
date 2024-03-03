// Importa a classe Model do Sequelize para definir o modelo de dados
import Sequelize, { Model } from "sequelize";

// Define a classe Products, que representa o modelo de produtos
class Products extends Model {
  // Método estático para inicializar o modelo Products com Sequelize
  static init(sequelize) {
    // Chama o método init da classe pai (Model) para inicializar o modelo com os atributos e opções especificados
    super.init(
      {
        name: Sequelize.STRING,
        price: Sequelize.INTEGER,
        path: Sequelize.STRING,
        offer: Sequelize.BOOLEAN,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `http://192.168.0.200:3333/product-file/${this.path}`
          },
        },
      },
      {
        sequelize, // Passa a instância do Sequelize para inicializar o modelo
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Category, {
      foreignKey: "category_id",
      as: "category",
    });
  }
}

// Exporta a classe Products para que ela possa ser usada em outros arquivos
export default Products;
