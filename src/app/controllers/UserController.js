/* eslint-disable import/no-named-as-default */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/no-extraneous-dependencies */
/*
store → Cadastrar / Adicionar
index → Listar vários
show  → Listar apenas UM
update → Atualizar
delete → Deletar
*/

// Importa a função v4 do pacote uuid para gerar IDs únicos
import { v4 } from 'uuid';
// Importa o pacote Yup para validação de esquemas
import * as Yup from 'yup';
// Importa o modelo User do arquivo '../models/User'
import User from '../models/User';

// Define a classe UserController
class UserController {
    // Define o método assíncrono store para cadastrar um novo usuário
    async store(request, response) {
        // Define o esquema de validação dos dados da requisição usando Yup
        const schema = Yup.object().shape({
            name: Yup.string().required(), // Nome obrigatório
            email: Yup.string().email().required(), // E-mail obrigatório e válido
            password: Yup.string().required().min(6), // Senha obrigatória, no mínimo 6 caracteres
            admin: Yup.boolean(), // Admin é um booleano (opcional)
        });

        // Tenta validar os dados da requisição com o esquema definido
        try {
            await schema.validateSync(request.body, { abortEarly: false });
        } catch (err) {
            // Se houver erros de validação, retorna um erro 400 (Bad Request) com os erros encontrados
            return response.status(400).json({ error: err.errors });
        }

        // Extrai os dados da requisição
        const { name, email, password, admin } = request.body;

        // Verifica se já existe um usuário com o e-mail fornecido
        const userExists = await User.findOne({
            where: { email },
        });

        // Se o usuário já existir, retorna um erro indicando que o usuário já existe
        if (userExists) {
            return response.status(409).json({ error: 'User already exists' });
        }

        // Cria um novo usuário com os dados fornecidos
        const user = await User.create({
            id: v4(), // Gera um ID único usando a função v4 do pacote uuid
            name,
            email,
            password,
            admin,
        });

        // Retorna os dados do usuário criado com sucesso e o status 201 (Created)
        return response.status(201).json({ id: user.id, name, email, admin });
    }
}

// Exporta uma instância da classe UserController
export default new UserController();
