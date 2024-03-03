/* eslint-disable import/no-named-as-default */
// Desativa a verificação de nomes padrão em imports para este arquivo

// Importa o Router do Express
import { Router } from "express";
import multer from "multer";
import multerconfig from "./config/multer";

// Importa o UserController e o SessionController, que são responsáveis por manipular as requisições relacionadas a usuários e sessões, respectivamente
import UserController from "./app/controllers/UserController";
import SessionController from "./app/controllers/SessionController";
import ProductController from "./app/controllers/ProductController";
import authMiddleware from "./app/middlewares/auth";
import CategoryController from "./app/controllers/CategoryController";
import OrderController from "./app/controllers/OrderController";

const upload = multer(multerconfig);

// Cria um novo objeto Router para definir as rotas da aplicação
const routes = new Router();

// Define a rota para cadastrar um novo usuário, usando o método store do UserController
routes.post("/users", UserController.store);

// Define a rota para autenticar um usuário (iniciar sessão), usando o método store do SessionController
routes.post("/sessions", SessionController.store);

routes.use(authMiddleware); // Sera chamado a todas as rotas abaixo

// Define a rota para cadastrar um novo produto, usando o método store do ProductController
routes.post("/products", upload.single("file"), ProductController.store);
routes.get("/products", ProductController.index);
routes.put("/products/:id", upload.single("file"), ProductController.update);

routes.post("/categories", upload.single("file"), CategoryController.store);
routes.get("/categories", CategoryController.index);
routes.put('/categories/:id', upload.single("file"), CategoryController.update)

routes.post("/orders", OrderController.store);
routes.put("/orders/:id", OrderController.update);
routes.get("/orders", OrderController.index);

// Exporta as rotas configuradas para serem utilizadas em outros arquivos
export default routes;
