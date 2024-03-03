/* eslint-disable class-methods-use-this */
import * as Yup from "yup";
import Category from "../models/Category";
import User from "../models/User";

class CategoryController {
  async store(request, response) {
    // Define o esquema de validação dos dados da requisição usando Yup
    const schema = Yup.object().shape({
      name: Yup.string().required(), // Nome obrigatório
    });

    // Tenta validar os dados da requisição com o esquema definido
    try {
      await schema.validateSync(request.body, { abortEarly: false });
    } catch (err) {
      // Se houver erros de validação, retorna um erro 400 (Bad Request) com os erros encontrados
      return response.status(400).json({ error: err.errors });
    }

    const { admin: isAdmin } = await User.findByPk(request.userId);

    if (!isAdmin) {
      return response.status(401).json();
    }

    const { name } = request.body;

    const { filename: path } = request.file;


    const categoryExists = await Category.findOne({
      where: {
        name,
      },
    });

    if (categoryExists) {
      return response
        .status(400)
        .json({
          erro: `Category already exists!`,
          message: "Essa categoria já existe!",
        });
    }

    try {
      // Cria uma nova categoria no banco de dados com os dados fornecidos
      const { id } = await Category.create({ name, path });

      // Retorna uma resposta JSON com os dados do produto criado
      return response.json({ id, name });
    } catch (error) {
      // Se houver um erro ao criar o produto, retorna um erro 500 (Internal Server Error)
      return response.status(500).json({ error: "Failed to create Category" });
    }
  }

  async index(request, response) {
    const category = await Category.findAll();
    // console.log(request.userId);
    return response.json(category);
  }



  async update(request, response) {
    // Define o esquema de validação dos dados da requisição usando Yup
    const schema = Yup.object().shape({
      name: Yup.string(),
    });

    // Tenta validar os dados da requisição com o esquema definido
    try {
      await schema.validateSync(request.body, { abortEarly: false });
    } catch (err) {
      // Se houver erros de validação, retorna um erro 400 (Bad Request) com os erros encontrados
      return response.status(400).json({ error: err.errors });
    }

    const { admin: isAdmin } = await User.findByPk(request.userId);

    if (!isAdmin) {
      return response.status(401).json();
    }

    const { name } = request.body;

    const {id} = request.params

    const category = await Category.findByPk(id)

    if(!category){
      return response.status(401).json({
        Error: "Make sure your category ID is correct",
        message: "Verifique se a ID da sua categoria está correto",
      });
    }

    let path
    if(request.file){
      path = request.file.filename

    }

    try {
      // Cria uma nova categoria no banco de dados com os dados fornecidos
     await Category.update({ name, path }, {where: { id }});

      // Retorna uma resposta JSON com os dados do produto criado
      return response.status(200).json();
    } catch (error) {
      // Se houver um erro ao criar o produto, retorna um erro 500 (Internal Server Error)
      return response.status(400).json({ error: "Failed to update Category" });
    }
  }
}

// Exporta uma instância do CategoryController corretamente
export default new CategoryController();
