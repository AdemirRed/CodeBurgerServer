// Importa o aplicativo Express configurado
import app from './app';
import configServerURL from './config/configServerURL';

// Define a porta em que o servidor Express irá ouvir as requisições
const port_ade = 3333; // 40367;

// Faz o aplicativo Express ouvir as requisições na porta especificada
app.listen(port_ade);
// 3300
console.log('🚪 Servidor rodando na porta 👌', + port_ade, `e endereço ${configServerURL}` );



// monorail.proxy.rlwy.net:40367