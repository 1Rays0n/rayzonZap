const wppconnect = require('@wppconnect-team/wppconnect');
const { verEtapAtendimento, mensagensRecebidas } = require('./etapa');
const { respostas } = require('./respostas');

let processingMessages = {}; // Objeto para rastrear mensagens por contato

wppconnect
  .create()
  .then((client) => start(client))
  .catch((error) => console.log(error));

function start(client) {
  client.onMessage(async (message) => {

    console.log(message);
    
    if (message.isGroupMsg || message.chatId === "status@broadcast") {
      return;
    }

    const sender = message.from;

    // Se já estiver processando uma mensagem para esse contato, ignore
    if (processingMessages[sender]) {
      console.log(`Ignorando mensagem de ${sender}, ainda processando a anterior.`);
      return;
    }

    // Marca como em processamento
    processingMessages[sender] = true;

    try {
      const enviarMensagemDe = verEtapAtendimento(sender, message.notifyName, message.content);
      const txtResposta = respostas[enviarMensagemDe].funcResposta(sender, message.notifyName);

      const atraso = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

      for (let index = 0; index < txtResposta.length; index++) {
        await atraso(1800);
        await client
          .sendText(sender, txtResposta[index])
          .then((result) => console.log('Enviado:', result))
          .catch((erro) => console.error('Erro ao enviar:', erro));
        await atraso(200);
      }
    } catch (error) {
      console.error('Erro no processamento da mensagem:', error);
    } finally {
      // Libera o processamento para novas mensagens desse contato
      delete processingMessages[sender];
    }
  });
}
