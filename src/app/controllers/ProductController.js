/* eslint-disable class-methods-use-this */
import * as Yup from "yup";
import Product from "../models/Product";
import Category from "../models/Category";
import User from "../models/User";

class ProductController {
  async store(request, response) {
    // Define o esquema de validação dos dados da requisição usando Yup
    const schema = Yup.object().shape({
      name: Yup.string().required(), // Nome obrigatório
      price: Yup.number().required(), // Preço obrigatório
      category_id: Yup.number().required(), // Categoria obrigatória
      offer: Yup.boolean(),
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

    // Verifica se um arquivo foi enviado na requisição
    if (!request.file) {
      return response.status(400).json({ error: "File not provided" });
    }

    const { filename: path } = request.file;
    const { name, price, category_id, offer } = request.body;

    try {
      // Cria um novo produto no banco de dados com os dados fornecidos
      const product = await Product.create({
        name,
        price,
        category_id,
        path,
        offer,
      });

      // Retorna uma resposta JSON com os dados do produto criado
      return response.json(product);
    } catch (error) {
      // Se houver um erro ao criar o produto, retorna um erro 500 (Internal Server Error)
      return response.status(500).json({ error: "Failed to create product" });
    }
  }

  async index(request, response) {
    const product = await Product.findAll({
      include: [
        {
          model: Category,
          as: "category",
          attributes: ["id", "name"],
        },
      ],
    });
    //  console.log(request.userId);
    return response.json(product);
  }

  async update(request, response) {
    // Define o esquema de validação dos dados da requisição usando Yup
    const schema = Yup.object().shape({
      name: Yup.string(),
      price: Yup.number(),
      category_id: Yup.number(),
      offer: Yup.boolean(),
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

    const { id } = request.params;

    const product = await Product.findByPk(id);

    if (!product) {
      return response
        .status(401)
        .json({
          Error: "Make sure your product ID is correct",
          message: "Verifique se o ID do seu produto está correto",
        });
    }

    let path;
    if (request.file) {
      path = request.file.filename;
    }
    

    const { name, price, category_id, offer } = request.body;

    try {
      // Cria um novo produto no banco de dados com os dados fornecidos
      await Product.update(
        {
          name,
          price,
          category_id,
          path,
          offer,
        },
        { where: { id } }
      );

      // Retorna uma resposta JSON com os dados do produto criado
      return response.status(200).json();
    } catch (error) {
      // Se houver um erro ao criar o produto, retorna um erro 500 (Internal Server Error)
      return response.status(500).json({ error: "Failed to create product" });
    }
  }
}

// Exporta uma instância do ProductController corretamente
export default new ProductController();
