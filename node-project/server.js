const express = require('express');
const bodyParser = require('body-parser');
const redis = require('redis');

const app = express();
const client = redis.createClient({
  host: 'redis',
  port: 6379
});

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Formulário</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
      </head>
      <body>
        <div class="container">
          <h1>Formulário</h1>
          <form action="/" method="post">
            <div class="form-group">
              <label for="inputNome">Nome:</label>
              <input type="text" class="form-control" id="inputNome" name="nome" placeholder="Digite seu nome">
            </div>
            <div class="form-group">
              <label for="inputSobrenome">Sobrenome:</label>
              <input type="text" class="form-control" id="inputSobrenome" name="sobrenome" placeholder="Digite seu sobrenome">
            </div>
            <button type="submit" class="btn btn-primary">Enviar</button>
          </form>
        </div>
      </body>
    </html>
  `);
});

app.post('/', (req, res) => {
  const nome = req.body.nome;
  const sobrenome = req.body.sobrenome;
  client.rpush('nomes', `${nome} ${sobrenome}`, (err, reply) => {
    if (err) {
      console.error(err);
      return res.send('Ocorreu um erro ao armazenar os dados.');
    }
    console.log(`Nome ${nome} ${sobrenome} armazenado com sucesso.`);
    res.send('Dados armazenados com sucesso!');
  });
});

const PORT = 8080;
const HOST = '0.0.0.0';

app.listen(PORT, HOST, () => {
  console.log(`Aplicação rodando em http://${HOST}:${PORT}`);
});