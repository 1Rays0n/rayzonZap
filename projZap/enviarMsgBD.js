const mongoose = require("mongoose");

// Definindo Schema com apenas campos necessários
const mensagemSchema = new mongoose.Schema({
    remetente: String,
        conteudo: String,
    timestamp: Date,
    nomeContato: String
}, { 
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
    versionKey: false 
});

const numeroExcluidoSchema = new mongoose.Schema({
    numero: String,
    nome: String,
    dataExclusao: {
        type: Date,
        default: Date.now
    }
}, { 
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
    versionKey: false 
});

const Mensagem = mongoose.model('mensagens', mensagemSchema);
const NumeroExcluido = mongoose.model('numerosexcluidos', numeroExcluidoSchema);

// Função assíncrona para salvar mensagem
async function enviarMsgBD(message) {
    try {
        if (message.fromMe) return; // Ignora mensagens enviadas pelo bot

        // Salva apenas dados essenciais
        const novaMensagem = new Mensagem({
            remetente: message.from,
            conteudo: message.content,
            timestamp: message.timestamp,
            nomeContato: message.notifyName
        });

        // Salva em background sem aguardar
        novaMensagem.save().catch(err => 
            console.error('Erro ao salvar mensagem:', err)
        );
    } catch (error) {
        console.error('Erro ao processar mensagem:', error);
    }
}

// Otimiza verificação de números excluídos com cache
const cacheNumerosExcluidos = new Set();
let lastCacheUpdate = 0;

async function verificarNumeroExcluido(numero) {
    try {
        // Atualiza cache a cada 5 minutos
        const agora = Date.now();
        if (agora - lastCacheUpdate > 300000) {
            const numerosExcluidos = await NumeroExcluido.find({}, 'numero');
            cacheNumerosExcluidos.clear();
            numerosExcluidos.forEach(n => cacheNumerosExcluidos.add(n.numero));
            lastCacheUpdate = agora;
        }

        return cacheNumerosExcluidos.has(numero);
    } catch (error) {
        console.error('Erro ao verificar número:', error);
        return false;
    }
}

// Função assíncrona para adicionar número à lista de excluídos
async function adicionarNumeroExcluido(message) {
    try {
        const novoExcluido = new NumeroExcluido({
            numero: message.from,
            nome: message.notifyName,
            dataExclusao: new Date()
        });

        await novoExcluido.save();
        
        // Atualiza o cache imediatamente
        cacheNumerosExcluidos.add(message.from);
        
        console.log('Número adicionado à lista de excluídos com sucesso');
        return true;
    } catch (error) {
        console.error('Erro ao adicionar número à lista de excluídos:', error);
        throw error; // Propaga o erro para ser tratado em respostas.js
    }
}

module.exports = { 
    enviarMsgBD, 
    verificarNumeroExcluido,
    adicionarNumeroExcluido 
};