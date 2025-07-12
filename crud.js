// crud.js
const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const logger = require('./logger'); // importando o logger customizado

const app = express();
app.use(express.json());

// Cria pasta logs caso não exista
const logDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// Logs de requisições HTTP com Morgan
const accessLogStream = fs.createWriteStream(path.join(logDir, 'http.log'), { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));
app.use(morgan('dev')); // exibe no terminal

// Usar as rotas centralizadas
const rotas = require('./rotas');
app.use(rotas);

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
  logger.info(`Servidor rodando na porta ${PORT}`);
  console.log(`Servidor rodando na porta ${PORT}`);
});
