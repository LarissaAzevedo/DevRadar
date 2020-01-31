// criação do servidor da aplicação na porta 3333
// mongoose é a conexão com o mongodb
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();

// conexão com o banco de dados
mongoose.connect('mongodb+srv://omnistacklari:omnistacklari@cluster0-bjjoq.mongodb.net/week10?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use(express.json());

app.use(routes)

app.listen(3333);