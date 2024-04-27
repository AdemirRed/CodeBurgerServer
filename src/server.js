// Importa o aplicativo Express configurado
import app from "./app";
import { urlServer, portServer } from "./config/configServerURL";

// Faz o aplicativo Express ouvir as requisições na porta especificada
app.listen(portServer);

console.log(
    `🚪 Servidor rodando na porta ${portServer} e endereço ${urlServer}`
);