// Importa a classe Model do Sequelize para definir o modelo de dados
import Sequelize, { Model } from "sequelize";
import { urlServer, portServer} from "../../config/configServerURL";

// Define a classe Products, que representa o modelo de produtos
class Category extends Model {
    // Método estático para inicializar o modelo Products com Sequelize
    static init(sequelize) {
        // Chama o método init da classe pai (Model) para inicializar o modelo com os atributos e opções especificados
        super.init(
            {
                name: Sequelize.STRING,
                path: Sequelize.STRING,
                url: {
                    type: Sequelize.VIRTUAL,
                    get() {
                        return `http://${urlServer}:${portServer}/product-file/${this.path}`
                    },
                  },
                 },
            {
                sequelize, // Passa a instância do Sequelize para inicializar o modelo
            }
        );
        return  this
    }
}

// Exporta a classe Products para que ela possa ser usada em outros arquivos
export default Category;
