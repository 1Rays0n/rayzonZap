const mongoose = require('mongoose');
let isConnected = false;

async function conectarBancoDados() {
    if (isConnected) return; // Reutiliza conexão existente

    try {
        // String de conexão direta
        const mongoURI = 'mongodb://mngdb-cntnr:27017/zapdb';
        // ou tente com localhost:
        // const mongoURI = 'mongodb://localhost:18018/zapdb';

        // Opções de conexão com timeouts reduzidos
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 2000,
            connectTimeoutMS: 2000,
            socketTimeoutMS: 2000
        };

        await mongoose.connect(mongoURI, options);
        isConnected = true;
        console.log("\n+ + + + + + \nConectado ao MongoDB no Docker\n+ + + + + + \n");
    } catch (error) {
        console.log("Erro ao conectar ao MongoDB: ", error);
        // Log mais detalhado do erro
        console.log("Detalhes do erro:", error.message);
    }
}

module.exports = { conectarBancoDados };

