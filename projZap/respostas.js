const { mensagensRecebidas } = require("./etapa");

    
    const respostas = 
    {
        "boasVindas":
        {
            "descrição": "Função com texto boas vindas e ações",
            "funcResposta": function respostas(tokenCliente)
                {
                    mensagensRecebidas[tokenCliente].etapaDoAtendimento = "opcaoinvalida";
                    return ["Oi!\nVocê mandou mensagem para o WhatsApp do Rayson.👋","Por favor digite uma das opções abaixo para continuar nossa conversa:\n\n\n1 - Se você deseja me vender alguma coisa \n2 - Se você esta aqui por que acredita que eu lhe devo algo \n3 - Se for um colaborador Naturys \n4 - Nenhuma das anteriores"];
                }
        },
        "vendas":
        {
            "descricao": "resposta para vendedores",
            "funcResposta":function respostas(tokenCliente)
            {
                delete mensagensRecebidas[tokenCliente];
                return ["Ok!","Peguei seu contato e vou analisar a oferta.\n Se a promoção valer a penas retorno em outro momento 😄","Tenha um ótimo dia e boas vendas!"];
            }
        },
        "cobranca":
        {
            "descricao": "resposta para cobradores",
            "funcResposta":function respostas(tokenCliente)
            {
                if (mensagensRecebidas[tokenCliente].contIteracoes == 0)
                {
                    mensagensRecebidas[tokenCliente].contIteracoes++;
                    return ["Beleza, isso eu não sabia.","Informa qual a empresa e o valor dessa dívida por que preciso analisar isso com calma."];
                };
                if (mensagensRecebidas[tokenCliente].contIteracoes == 1)
                {
                    mensagensRecebidas[tokenCliente].contIteracoes++;
                    return ["Esses é o valor e o nome da empresa?","Tem certeza que nao esqueceu nada?"];
                };
                if (mensagensRecebidas[tokenCliente].contIteracoes >=2)
                {
                    delete mensagensRecebidas[tokenCliente];
                    return ["Obrigado. Retorno logo que analisar os dados."];
                };
            }            
        },
        "naturys":
        {
            "descricao": "resposta para o pessoal da Naturys",
            "funcResposta":function respostas(tokenCliente,nome)
            {
                if (mensagensRecebidas[tokenCliente].contIteracoes == 0)
                {
                    mensagensRecebidas[tokenCliente].contIteracoes++;
                    return [`Opa, iae ${nome}! 👋`,"Sai da Naturys a alguns dias","Qualquer dúvida referente a rota favor procurar o Sr. Alexandre","Para outros assuntos informe o motivo do contato que retorno logo que possível"];
                };
                if (mensagensRecebidas[tokenCliente].contIteracoes > 0)
                {
                    delete mensagensRecebidas[tokenCliente];
                    return ["Obrigado!👋✨\n Tenha um ótimo dia!"];
                };
            }
        },
        "outrosassuntos":
        {
            "descricao": "outros assuntos",
            "funcResposta":function respostas(tokenCliente)
            {
                delete mensagensRecebidas[tokenCliente];
                return ["Dae meu povo!","Se tem outras coisas para conversar comigo me encontra no Telegram.\n\nAté breve 😎"];
            }
        },
        "opcaoinvalida":
        {
            "descricao": "opção inválida",
            "funcResposta": function respostas(tokenCliente,nome)
            {                
                if (mensagensRecebidas[tokenCliente].contIteracoes >2)
                {
                    delete mensagensRecebidas[tokenCliente];
                    return ["Vish... o negócio está baldeado 🤦‍♂️"];
                }
                mensagensRecebidas[tokenCliente].contIteracoes++;
                return [`Hmmmm ${nome}, você digitou uma resposta inválida. \nPara nossa conversa continuar eu preciso que você digite uma das opções abaixo: `,"1 - Se você deseja me vender alguma coisa \n2 - Se você esta aqui por que acredita que eu lhe devo algo \n3 - Se for um colaborador Naturys \n4 - Nenhuma das anteriores\n\n🤔🤔"];
            }
        }
    }
 
    module.exports = {respostas};