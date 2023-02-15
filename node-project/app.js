const express = require('express');
const redis = require('redis');
const app = express();


const HOST = "0.0.0.0"

// Cria uma nova instância do cliente Redis
const client = redis.createClient({
  host: 'redis', // Endereço do servidor Redis
  port: 6379 // Porta do servidor Redis
});

// Testa a conexão com o servidor Redis
client.ping((error, result) => {
  if (error) {
    console.error('Erro ao se conectar ao Redis:', error);
  } else {
    console.log('Conectado ao Redis:', result);
  }
});

// Configura o middleware para decodificar o corpo da solicitação HTTP
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define a rota para exibir o formulário
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Armazenar nome e sobrenome em Redis</title>
      </head>
      <body>
        <h1>Armazenar nome e sobrenome em Redis</h1>
        <form method="POST" action="/">
          <div>
            <label for="nome">Nome:</label>
            <input type="text" id="nome" name="nome">
          </div>
          <div>
            <label for="sobrenome">Sobrenome:</label>
            <input type="text" id="sobrenome" name="sobrenome">
          </div>
          <button type="submit">Enviar</button>
        </form>
      </body>
    </html>
  `);
});

// Define a rota para processar o formulário
app.post('/', (req, res) => {
  const { nome, sobrenome } = req.body;

  // Armazena os dados no Redis
  client.set('nome', nome);
  client.set('sobrenome', sobrenome);

  res.send(`Dados armazenados: ${nome} ${sobrenome}`);
});

// Inicia o servidor
app.listen(8080, () => {
  console.log('Servidor iniciado na porta 8080');
});
