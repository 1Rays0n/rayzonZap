const mongoose = require('mongoose');

async function conectarBancoDados() {
    try {
        // Configurações de conexão
        const mongoConfig = {
            host: '0.0.0.0', // IP privado do servidor AWS
            port: '18018',        // Porta exposta pelo Docker
            dbName: 'zapdb'       // Nome do banco de dados
        };

        // String de conexão
        const mongoURI = `mongodb://${mongoConfig.host}:${mongoConfig.port}/${mongoConfig.dbName}`;

        // Opções de conexão
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000, // Timeout após 5 segundos
            // Se precisar de autenticação, adicione as credenciais aqui
            // user: 'seu_usuario',
            // pass: 'sua_senha'
        };

        await mongoose.connect(mongoURI, options);
        console.log("\n+ + + + + + \nConectado ao MongoDB no Docker\n+ + + + + + \n");
    } catch (error) {
        console.log("Erro ao conectar ao MongoDB: ", error);
    }
}

module.exports = { conectarBancoDados };