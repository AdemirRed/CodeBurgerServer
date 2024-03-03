// Importa o multer para lidar com o upload de arquivos
import multer from 'multer';
// Importa a função v4 do pacote uuid para gerar IDs únicos

import { v4 } from 'uuid';
// Importa a função extname e resolve do pacote path para lidar com extensões de arquivo e resolução de caminhos
import { extname, resolve } from 'path';



// Exporta um objeto que contém a configuração de armazenamento para o multer
export default {
    // Configura o armazenamento do multer como armazenamento em disco
    storage: multer.diskStorage({

        // Define o diretório de destino para os uploads de arquivos
        destination: resolve(__dirname, '..', '..', 'uploads'),
        // Define o nome do arquivo como um UUID único + extensão do nome original do arquivo
        filename: (request, file, callback) =>
            // Retorna o nome do arquivo chamando a função de retorno de chamada com null para o erro e o nome do arquivo gerado
            callback(null, v4() + extname(file.originalname))

    })
};
