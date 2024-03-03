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

// Importa o pacote Yup para validação de esquemas
import * as Yup from "yup";
import Product from "../models/Product";
import Category from "../models/Category";
import Order from "../schemas/Order";
import User from "../models/User";

// Define a classe OrderController
class OrderController {
  // Define o método assíncrono store para cadastrar um novo usuário
  async store(request, response) {
    // Define o esquema de validação dos dados da requisição usando Yup
    const schema = Yup.object().shape({
      products: Yup.array()
        .required()
        .of(
          Yup.object().shape({
            id: Yup.number().required(),
            quantity: Yup.number().required(),
          })
        ), // Nome obrigatório
    });

    // Tenta validar os dados da requisição com o esquema definido
    try {
      await schema.validateSync(request.body, { abortEarly: false });
    } catch (err) {
      // Se houver erros de validação, retorna um erro 400 (Bad Request) com os erros encontrados
      return response.status(400).json({ error: err.errors });
    }

    const productsId = request.body.products.map((product) => product.id);

    const updatedProducts = await Product.findAll({
      where: {
        id: productsId,
      },
      include: [
        {
          model: Category,
          as: "category",
          attributes: ["name"],
        },
      ],
    });

    const editedProduct = updatedProducts.map((product) => {
      const productIndex = request.body.products.findIndex(
        (requestProduct) => requestProduct.id === product.id
      );

      const newPeoduct = {
        id: product.id,
        name: product.name,
        price: product.price,
        category: product.category.name,
        url: product.url,
        quantity: request.body.products[productIndex].quantity,
      };

      return newPeoduct;
    });

    const order = {
      user: {
        id: request.userId,
        name: request.userName,
      },
      products: editedProduct,
      status: "Pedido realizado",
    };

    const orderResponse = await Order.create(order);

    // Retorna os dados do usuário criado com sucesso e o status 201 (Created)
    return response.status(201).json(orderResponse);
  }

  async index(request, response) {
    const orders = await Order.find();

    return response.json(orders);
  }

  async update(request, response) {
    const schema = Yup.object().shape({
        status: Yup.string().required(),
    });

    try {
        await schema.validateSync(request.body, { abortEarly: false });
      } catch (err) {
        // Se houver erros de validação, retorna um erro 400 (Bad Request) com os erros encontrados
        return response.status(400).json({ error: err.errors });
      }

      const { admin: isAdmin} = await User.findByPk(request.userId)

        if(!isAdmin){
          return  response.status(401).json()
        }

    const { id } = request.params;
    const { status } = request.body;
    try {
      await Order.updateOne({ _id: id }, { status });
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }






    return response.json({
      msg: "Status was updated!",
      message: "Status atualizado com sucesso!",
    });
  }
}

// Exporta uma instância da classe OrderController
export default new OrderController();
