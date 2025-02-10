// Supports ES6
// import { create, Whatsapp } from '@wppconnect-team/wppconnect';
const wppconnect = require('@wppconnect-team/wppconnect');
const { verEtapAtendimento, mensagensRecebidas } = require('./etapa');
const { respostas } = require('./respostas');

wppconnect
  .create()
  .then((client) => start(client))
  .catch((error) => console.log(error));

function start(client) {
  client.onMessage(async (message) => {
    
    if(message.isGroupMsg == true || message.chatId == "status@broadcast")
    {
      return;
    }

    //Verifica em que momento a conversa esta
    const enviarMensagemDe = verEtapAtendimento(message.from,message.notifyName,message.content);
    //Pega o estado e salva na variavel
    const txtResposta = respostas[enviarMensagemDe].funcResposta(message.from,message.sender.name);

    // Função para criar um atraso nas resposta
    const atraso = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    //Loop para iteração com vetores de mensagens resposta
    for (let index = 0; index < txtResposta.length; index++) {
        
      await atraso(1800);
        await client
          .sendText(message.from, txtResposta[index])
          .then((result) => {
            console.log('Result: ', result); //return object success
          })
          .catch((erro) => {
            console.error('Error when sending: ', erro); //return object error
          });
      await atraso(200);
    }
  });
}