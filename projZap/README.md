# Bot WhatsApp com MongoDB
Bot automatizado para WhatsApp que gerencia conversas e armazena mensagens em MongoDB.

## 📋 Descrição
Este bot gerencia conversas no WhatsApp de forma automatizada, oferecendo respostas predefinidas baseadas em diferentes cenários de interação. Todas as mensagens recebidas são armazenadas em um banco de dados MongoDB para histórico e análise.

### Funcionalidades Principais
- Respostas automáticas baseadas em cenários específicos
- Armazenamento de mensagens em MongoDB
- Sistema de exclusão de números (opt-out)
- Gerenciamento de filas de mensagens
- Filtro para grupos e broadcasts

## 🚀 Instalação
### Pré-requisitos
- Node.js (v14 ou superior)
- MongoDB (local ou em container Docker)
- Git

### Configuração do MongoDB
Se estiver usando Docker:
```bash
docker run -d --name mngdb-cntnr -p 18018:27017 mongo
```

### Passos para Instalação
1. Clone o repositório:
```bash
git clone [url-do-seu-repositorio]
cd [nome-da-pasta]
```

2. Instale as dependências:
```bash
npm install
```

3. Configure o arquivo database.js com suas credenciais do MongoDB:
```javascript
const mongoConfig = {
    host: 'seu_ip',    // localhost ou IP do servidor
    port: '18018',     // porta do MongoDB
    dbName: 'zapdb'    // nome do banco de dados
};
```

4. Inicie o bot:
```bash
npm start
```

## 📦 Dependências
- @wppconnect-team/wppconnect: ^1.35.2
- mongoose: ^7.6.8

## 🗃️ Estrutura do Banco de Dados
### Coleções:
- `mensagens`: Armazena todas as mensagens recebidas
- `numerosexcluidos`: Armazena números que optaram por não receber mais mensagens

## 🔧 Configuração
### Arquivos Principais:
- `aplic.js`: Arquivo principal do bot
- `database.js`: Configurações de conexão com MongoDB
- `enviarMsgBD.js`: Gerenciamento de mensagens no banco
- `respostas.js`: Configuração das respostas automáticas
- `etapa.js`: Gerenciamento do fluxo de conversas

## ⚠️ Observações Importantes
1. **Segurança**:
   - Não compartilhe suas credenciais do MongoDB
   - Mantenha o token do WhatsApp seguro
   - Configure corretamente as permissões do Docker
2. **Performance**:
   - O bot possui sistema de fila para evitar sobrecarga
   - Mensagens de grupos são ignoradas por padrão
3. **Limitações**:
   - Necessário manter sessão do WhatsApp ativa
   - Dependente de conexão estável com internet
   - Limitado pelas políticas do WhatsApp

## 🤝 Contribuindo
1. Faça um Fork do projeto
2. Crie sua Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a Branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença
Este projeto está sob a licença MIT - veja o arquivo LICENSE.md para detalhes.

## 📞 Suporte
Para suporte, abra uma issue no GitHub.