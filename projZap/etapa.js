
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
    if(mensagensRecebidas[tokenCliente].contIteracoes == 0)
    {
        valideRespotas(tokenCliente,msg);
        return mensagensRecebidas[tokenCliente].etapaDoAtendimento;
    }
    return mensagensRecebidas[tokenCliente].etapaDoAtendimento;   
}

function valideRespotas (tokenCliente, msg){
    if (!mensagensRecebidas[tokenCliente])
    {
        console.error("Cliente não encontrado!");
        return;
    }        
    switch (msg)
    {
        case "1":
            mensagensRecebidas[tokenCliente].etapaDoAtendimento = "vendas"                       
            break;
        case "2":
            mensagensRecebidas[tokenCliente].etapaDoAtendimento = "cobranca";            
            break;
        case "3":
            mensagensRecebidas[tokenCliente].etapaDoAtendimento = "naturys";            
            break; 
        case "4":
            mensagensRecebidas[tokenCliente].etapaDoAtendimento = "outrosassuntos";            
            break; 
        default:
            mensagensRecebidas[tokenCliente].etapaDoAtendimento = "opcaoinvalida";            
            break;
    }
        
}

module.exports = {verEtapAtendimento, mensagensRecebidas};