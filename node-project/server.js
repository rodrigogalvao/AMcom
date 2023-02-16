const express = require('express');
const redis = require('redis');
const bodyParser = require('body-parser');

const app = express();
const client = redis.createClient({
    host: 'redis',
    port: 6379
});

client.on('connect', function() {
    console.log('Conectado ao Redis...');
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

// Rota principal
app.get('/', (req, res) => {
    res.render('index');
});

// Rota para processar o formulário
app.post('/', (req, res) => {
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    client.lpush('names', first_name + ' ' + last_name, (err, reply) => {
        if (err) {
            console.log(err);
        }
        console.log(reply);
        res.redirect('/');
    });
});

// Inicializa o servidor HTTP na porta 8080 e no endereço 0.0.0.0
const server = app.listen(8080, '0.0.0.0', () => {
    console.log(`Aplicativo rodando em http://${server.address().address}:${server.address().port}`);
});