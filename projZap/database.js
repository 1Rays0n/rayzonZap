const mongoose = require('mongoose');

async function conectarBancoDados() {
    try {
        // String de conexão direta
        const mongoURI = 'mongodb://mngdb-cntnr:27017/zapdb';
        // ou tente com localhost:
        // const mongoURI = 'mongodb://localhost:18018/zapdb';

        // Opções de conexão com timeouts reduzidos
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,  // Reduzido para 5 segundos
            connectTimeoutMS: 5000,          // Reduzido para 5 segundos
            socketTimeoutMS: 5000            // Reduzido para 5 segundos
        };

        await mongoose.connect(mongoURI, options);
        console.log("\n+ + + + + + \nConectado ao MongoDB no Docker\n+ + + + + + \n");
    } catch (error) {
        console.log("Erro ao conectar ao MongoDB: ", error);
        // Log mais detalhado do erro
        console.log("Detalhes do erro:", error.message);
    }
}

module.exports = { conectarBancoDados };

