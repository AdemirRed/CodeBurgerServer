/* eslint-disable class-methods-use-this */
// Importa a biblioteca Yup para lidar com validação de esquemas
import * as Yup from 'yup';

import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth';
// Importa o modelo de usuário (presumivelmente definido em '../models/User')
import User from '../models/User';

// Define uma classe chamada SessionController
class SessionController {
    // Define um método assíncrono chamado 'store' que recebe os objetos 'request' e 'response'
    async store(request, response) {
        // Define um esquema Yup para validar os dados da requisição
        const schema = Yup.object().shape({
            email: Yup.string().email().required(), // O campo 'email' é uma string válida e obrigatória
            password: Yup.string().required(),      // O campo 'password' é uma string obrigatória
        });

        // Define uma função que retorna um erro de senha ou e-mail incorretos
        const userEmailOrPasswordIncorrect = () => response.status(400).json({
            error: 'Make sure your password or email are correct', // Mensagem de erro em inglês
            message: 'Verifique se sua senha ou e-mail estão corretos' // Mensagem de erro em português
        });

        // Verifica se os dados da requisição não passam no esquema de validação
        if (!(await schema.isValid(request.body))) {
            return userEmailOrPasswordIncorrect(); // Retorna um erro se os dados não são válidos
        }

        // Extrai 'email' e 'password' do corpo da requisição
        const { email, password } = request.body;

        // Procura um usuário no banco de dados com o e-mail fornecido
        const user = await User.findOne({
            where: { email },
        });

        // Verifica se o usuário não foi encontrado no banco de dados
        if (!user) {
            return userEmailOrPasswordIncorrect(); // Retorna um erro se o usuário não existe
        }

        // Verifica se a senha fornecida corresponde à senha armazenada para o usuário
        if (!(await user.checkPassword(password))) {
            return userEmailOrPasswordIncorrect(); // Retorna um erro se a senha está incorreta
        }

        // Retorna os detalhes do usuário se a autenticação for bem-sucedida
        return response.json({
            id: user.id,
            email,
            name: user.name,
            admin: user.admin,
            token: jwt.sign({ id: user.id, name: user.name }, authConfig.secret, {
                expiresIn: authConfig.expiresIn,
            })
        });
    }
}

// Exporta uma instância da classe SessionController
export default new SessionController();
