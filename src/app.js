/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/order */
// Importa o framework Express
import express from "express";
import routes from "./routes";
import "./database";
import { resolve } from "path";
import cors from 'cors'

// Classe responsável por configurar o aplicativo Express
class App {
  constructor() {
    // Inicializa o aplicativo Express
    this.app = express();
    this.app.use(cors())
    // Configura os middlewares
    this.middlewares();
    // Configura as rotas
    this.routes();

  }

  // Método para configurar os middlewares do aplicativo
  middlewares() {
    // Usa o middleware para parsear o corpo das requisições como JSON
    this.app.use(express.json());
    this.app.use(
      "/product-file",
      express.static(resolve(__dirname, "..", "uploads"))
    );

    this.app.use(
      "/category-file",
      express.static(resolve(__dirname, "..", "uploads"))
    );
  }

  // Método para configurar as rotas do aplicativo
  routes() {
    // Usa as rotas definidas no arquivo 'routes.js'
    this.app.use(routes);
  }
}

// Exporta uma instância do aplicativo Express configurado
export default new App().app;
