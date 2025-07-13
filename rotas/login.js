const express = require('express');
const router = express.Router();
const db = require('../db');
const logger = require('../logger');
    console.log('arquivo login acessado');
// Login: tenta autenticar como paciente, depois como funcionário

router.post('/autenticar', (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ error: 'Email e senha são obrigatórios' });
  }

  // Primeiro tenta como paciente
  const sqlPaciente = `
    SELECT CPF_PACIENTE AS cpf, NOME, 'paciente' AS tipo
    FROM PACIENTE
    WHERE email = ? AND senha = ?
  `;

  db.query(sqlPaciente, [email, senha], (err, results) => {
    if (err) {
      logger.error(`Erro ao autenticar paciente: ${err.message}`);
      return res.status(500).json({ error: 'Erro no servidor' });
    }

    if (results.length > 0) {
      const usuario = results[0];
      req.session.usuario = {
        cpf: usuario.cpf,
        nome: usuario.NOME,
        tipo: usuario.tipo,
        email
      };
      logger.info(`Paciente ${usuario.cpf} autenticado`);
      return res.json({ message: 'Login realizado como paciente', usuario: req.session.usuario });
    }

    // Se não for paciente, tenta como funcionário
    const sqlFuncionario = `
      SELECT CPF_FUNCIONARIO AS cpf, NOME, TIPO AS tipo
      FROM FUNCIONARIO
      WHERE email = ? AND senha = ?
    `;

    db.query(sqlFuncionario, [email, senha], (err2, results2) => {
      if (err2) {
        logger.error(`Erro ao autenticar funcionário: ${err2.message}`);
        return res.status(500).json({ error: 'Erro no servidor' });
      }

      if (results2.length > 0) {
        const usuario = results2[0];
        req.session.usuario = {
          cpf: usuario.cpf,
          nome: usuario.NOME,
          tipo: usuario.tipo,
          email
        };
        logger.info(`Funcionário ${usuario.cpf} autenticado`);
        return res.json({ message: 'Login realizado como funcionário', usuario: req.session.usuario });
      }

      // Se não achou em nenhuma das duas
      return res.status(401).json({ error: 'Email ou senha inválidos' });
    });
  });
});

// Verificar se está logado
router.get('/sessao', (req, res) => {
  if (req.session.usuario) {
    res.json({ logado: true, usuario: req.session.usuario });
  } else {
    res.json({ logado: false });
  }
});

// Logout
router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      logger.error('Erro ao encerrar sessão');
      return res.status(500).json({ error: 'Erro ao encerrar sessão' });
    }
    res.json({ message: 'Logout realizado com sucesso' });
  });
});

module.exports = router;
