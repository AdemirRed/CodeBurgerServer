/* eslint-disable import/no-extraneous-dependencies */
// Importa o Sequelize e a classe Model do Sequelize
import Sequelize, { Model } from 'sequelize';
// Importa a biblioteca bcrypt para hash de senhas
import bcrypt from 'bcrypt';

// Define a classe User que estende a classe Model do Sequelize
class User extends Model {
    // Método estático para inicializar o modelo do usuário
    static init(sequelize) {
        // Chama o método init da classe pai (Model) para inicializar o modelo do usuário
        super.init(
            {
                name: Sequelize.STRING, // Campo para o nome do usuário
                email: Sequelize.STRING, // Campo para o e-mail do usuário
                password: Sequelize.VIRTUAL, // Campo virtual para a senha do usuário (não é armazenado no banco de dados)
                password_hash: Sequelize.STRING, // Campo para o hash da senha (armazenado no banco de dados)
                admin: Sequelize.BOOLEAN, // Campo para indicar se o usuário é administrador
            },
            {
                sequelize, // Passa o objeto Sequelize para a configuração do modelo
            },
        );
        // Adiciona um hook (gancho) antes de salvar o usuário para gerar o hash da senha
        this.addHook('beforeSave', async (user) => {
            if (user.password) {
                // Se o usuário tiver uma senha definida, gera o hash dela com bcrypt
                // eslint-disable-next-line no-param-reassign
                user.password_hash = await bcrypt.hash(user.password, 10);
            }
        });

        return this; // Retorna o modelo do usuário inicializado
    }

    // Método para verificar se a senha fornecida corresponde ao hash armazenado
    checkPassword(password) {
        return bcrypt.compare(password, this.password_hash); // Compara a senha fornecida com o hash armazenado
    }
}

// Exporta o modelo do usuário
export default User;
