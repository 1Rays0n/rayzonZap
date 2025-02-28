const mongoose = require('mongoose');

async function conectarBancoDados ()
{
    try
    {
        await mongoose.connect(
            'mongodb://localhost:27017/zapdb');
        console.log("\n+ + + + + + \nConectado ao server\n+ + + + + + \n");
    } catch (error)
    {
        console.log("Erro ao conectar ao MOngoDB: ", error);
    }
}

module.exports = {conectarBancoDados};