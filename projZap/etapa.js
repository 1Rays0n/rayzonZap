
const mensagensRecebidas = 
{
    "novaConversa":
    {
        "numero": "numero do cliente",
        "nome": "nome do cliente",
        "mensagem": "mensagem enviada",
        "etapaDoAtendimento": "passa a resposta a enviar",
        "contIteracoes":0
    }
}


function verEtapAtendimento (tokenCliente, nome, msg)
{
    if (!mensagensRecebidas[tokenCliente])
    {
        mensagensRecebidas[tokenCliente] = 
        {
            numero: tokenCliente,
            nome: nome,
            mensagem: msg,
            etapaDoAtendimento: "boasVindas",
            contIteracoes:0
        };
        return mensagensRecebidas[tokenCliente].etapaDoAtendimento;
    };
    if(mensagensRecebidas[tokenCliente].contIteracoes == 0 
        || mensagensRecebidas[tokenCliente].etapaDoAtendimento == "opcaoinvalida")//Verifica se está na primeira iteração
    {
        valideRespotas(tokenCliente,msg);//Avalia e responde de acordo
        return mensagensRecebidas[tokenCliente].etapaDoAtendimento;
    }
    return mensagensRecebidas[tokenCliente].etapaDoAtendimento;   
}

function valideRespotas (tokenCliente, msg){
    const antes = mensagensRecebidas[tokenCliente].etapaDoAtendimento;
    if (!mensagensRecebidas[tokenCliente])
    {
        console.error("\n\nCliente não encontrado!\n\n");
        return;
    }        
    switch (msg)//Valida o retorno do cliente e insere na posição adequada
    {
        case "1":
            mensagensRecebidas[tokenCliente].etapaDoAtendimento = "vendas";
            if(antes != "vendas")
                {
                    mensagensRecebidas[tokenCliente].contIteracoes = 0;
                }                     
            break;
        case "2":
            mensagensRecebidas[tokenCliente].etapaDoAtendimento = "cobranca";
            if(antes != "cobranca")
                {
                    mensagensRecebidas[tokenCliente].contIteracoes = 0;
                }         
            break;
        case "3":
            mensagensRecebidas[tokenCliente].etapaDoAtendimento = "naturys";
            if(antes != "naturys")
                {
                    mensagensRecebidas[tokenCliente].contIteracoes = 0;
                }        
            break; 
        case "4":
            mensagensRecebidas[tokenCliente].etapaDoAtendimento = "outrosassuntos";
            if(antes != "outrosassuntos")
                {
                    mensagensRecebidas[tokenCliente].contIteracoes = 0;
                }            
            break; 
        default:
            mensagensRecebidas[tokenCliente].etapaDoAtendimento = "opcaoinvalida";
            if(antes != "outrosassuntos")
                {
                    mensagensRecebidas[tokenCliente].contIteracoes = 0;
                }          
            break;
    }
        
}

module.exports = {verEtapAtendimento, mensagensRecebidas};