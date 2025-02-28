const mongoose = require("mongoose");

// Definindo Schema
const mensagemSchema = new mongoose.Schema({
    remetente: String,
    destinatario: String,
    conteudo: String,
    tipo: String,
    timestamp: Date,
    nomeContato: String,
    // Campos adicionais para metadata
    dadosCompletos: {
        type: Map,
        of: mongoose.Schema.Types.Mixed
    }
}, { timestamps: true });

// Novo Schema para números excluídos
const numeroExcluidoSchema = new mongoose.Schema({
    numero: String,
    nome: String,
    dataExclusao: {
        type: Date,
        default: Date.now
    },
    ultimaMensagem: String
}, { timestamps: true });

// Criar modelos
const Mensagem = mongoose.model('mensagens', mensagemSchema);
const NumeroExcluido = mongoose.model('numerosexcluidos', numeroExcluidoSchema);

// Função para salvar mensagem
async function enviarMsgBD(message) {
    try {
        // Verifica se a mensagem é recebida (não é enviada pelo bot)
        if (message.fromMe) {
            return; // Se for mensagem enviada pelo bot, não salva
        }

        const novaMensagem = new Mensagem({
            remetente: message.from,
            destinatario: message.to,
            conteudo: message.content,
            tipo: message.type,
            timestamp: message.timestamp,
            nomeContato: message.notifyName,
            dadosCompletos: message
        });

        await novaMensagem.save();
        console.log('Mensagem recebida salva com sucesso no MongoDB');
    } catch (error) {
        console.error('Erro ao salvar mensagem no MongoDB:', error);
    }
}

// Função para salvar número na lista de excluídos
async function adicionarNumeroExcluido(message) {
    try {
        const novoExcluido = new NumeroExcluido({
            numero: message.from,
            nome: message.notifyName,
            ultimaMensagem: message.content
        });

        await novoExcluido.save();
        console.log('Número adicionado à lista de excluídos com sucesso');
    } catch (error) {
        console.error('Erro ao adicionar número à lista de excluídos:', error);
    }
}

// Função para verificar se número está na lista de excluídos
async function verificarNumeroExcluido(numero) {
    try {
        const numeroExcluido = await NumeroExcluido.findOne({ numero: numero });
        return numeroExcluido != null;
    } catch (error) {
        console.error('Erro ao verificar número excluído:', error);
        return false;
    }
}

module.exports = { 
    enviarMsgBD, 
    adicionarNumeroExcluido, 
    verificarNumeroExcluido 
};