module.exports = {
    dialect: 'postgres', // Dialeto do banco de dados (PostgreSQL)
    host: 'localhost', // Endereço do host onde o banco de dados está sendo executado (localmente neste caso)
    username: 'postgres', // Nome de usuário para acessar o banco de dados PostgreSQL
    password: 'postgres', // Senha para acessar o banco de dados PostgreSQL
    database: 'codeburger', // Nome do banco de dados que está sendo utilizado (codeburger neste caso)
    define: {
        timestamps: true, // Adiciona campos 'createdAt' e 'updatedAt' automaticamente a todas as tabelas
        underscored: true, // Usa o estilo de nomenclatura underscored para nomes de tabela e campos
        underscoredAll: true, // Força a notação underscored em todas as relações (tabelas e colunas)
    },
};

// module.exports = {
//     dialect: 'postgres', // Dialeto do banco de dados (PostgreSQL)
//     host: 'monorail.proxy.rlwy.net', // Endereço do host onde o banco de dados está sendo executado
//     username: 'postgres', // Nome de usuário para acessar o banco de dados PostgreSQL
//     password: 'a6GEdbEA1GBeAG*Bfd*g44GcCeEF4-5c', // Senha para acessar o banco de dados PostgreSQL
//     database: 'railway', // Nome do banco de dados que está sendo utilizado
//     define: {
//         timestamps: true, // Adiciona campos 'createdAt' e 'updatedAt' automaticamente a todas as tabelas
//         underscored: true, // Usa o estilo de nomenclatura underscored para nomes de tabela e campos
//         underscoredAll: true, // Força a notação underscored em todas as relações (tabelas e colunas)
//     },
// };
