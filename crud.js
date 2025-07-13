// crud.js
const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const session = require('express-session'); 
const logger = require('./logger');

const app = express();
app.use(express.json());

app.use(session({
  secret: 'chave-super-secreta',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60 * 60 * 1000 } // 1 hora
}));


// Cria pasta logs caso não exista
const logDir = path.join(__dirname, 'logs');

// Logs de requisições HTTP
const accessLogStream = fs.createWriteStream(path.join(logDir, 'http.log'), { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));
app.use(morgan('dev'));

// Usar as rotas centralizadas
const rotas = require('./rotas');
app.use(rotas);

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
  logger.info(`Servidor rodando na porta ${PORT}`);
  console.log(`Servidor rodando na porta ${PORT}`);
});
