const express = require('express');
const router = express.Router();
const db = require('../db');
const logger = require('../logger');  
const permitirTipos = require('../meios/permitirTipos');
const verificaLogin = require('../meios/verificaLogin'); 

router.post('/',verificaLogin,permitirTipos('administrador'), (req, res) => {
  const { cpf, tipo, nome, idade, idUnidade, dataNascimento } = req.body;

  const sql = `
    INSERT INTO FUNCIONARIO 
    (CPF_FUNCIONARIO, TIPO, NOME, IDADE, ID_UNIDADE_FK, DATA_NASCIMENTO)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [cpf, tipo, nome, idade, idUnidade, dataNascimento], (err) => {
    if (err) {
      console.error('Erro ao inserir FUNCIONARIO:', err.message);
      logger.error(`Erro ao inserir FUNCIONARIO: ${err.message}`);
      return res.status(500).json({ error: err.message });
    }
    console.log(`FUNCIONARIO ${nome} inserido com sucesso`);
    logger.info(`FUNCIONARIO ${nome} inserido com sucesso`);
    res.status(201).json({ message: 'FUNCIONARIO inserido com sucesso' });
  });
});

router.get('/',verificaLogin,permitirTipos('administrador'), (req, res) => {
  const sql = `SELECT * FROM FUNCIONARIO`;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Erro ao buscar FUNCIONARIOS:', err.message);
      logger.error(`Erro ao buscar FUNCIONARIOS: ${err.message}`);
      return res.status(500).json({ error: err.message });
    }
    console.log('Lista de FUNCIONARIOS retornada');
    logger.info('Lista de FUNCIONARIOS retornada com sucesso');
    res.json(results);
  });
});

router.get('/:cpf', permitirTipos('administrador'), (req, res) => {
  const cpf = req.params.cpf;

  const sql = `SELECT * FROM FUNCIONARIO WHERE CPF_FUNCIONARIO = ?`;

  db.query(sql, [cpf], (err, results) => {
    if (err) {
      console.error('Erro ao buscar FUNCIONARIO:', err.message);
      logger.error(`Erro ao buscar FUNCIONARIO: ${err.message}`);
      return res.status(500).json({ error: err.message });
    }
    if (results.length === 0) {
      console.log(`FUNCIONARIO com CPF ${cpf} não encontrado`);
      logger.info(`FUNCIONARIO com CPF ${cpf} não encontrado`);
      return res.status(404).json({ message: 'FUNCIONARIO não encontrado' });
    }
    console.log(`FUNCIONARIO com CPF ${cpf} retornado`);
    logger.info(`FUNCIONARIO com CPF ${cpf} retornado`);
    res.json(results[0]);
  });
});

router.put('/:cpf', permitirTipos('administrador'), (req, res) => {
  const cpf = req.params.cpf;
  const { tipo, nome, idade, idUnidade, dataNascimento } = req.body;

  const sql = `
    UPDATE FUNCIONARIO SET
      TIPO = ?,
      NOME = ?,
      IDADE = ?,
      ID_UNIDADE_FK = ?,
      DATA_NASCIMENTO = ?
    WHERE CPF_FUNCIONARIO = ?
  `;

  db.query(sql, [tipo, nome, idade, idUnidade, dataNascimento, cpf], (err, result) => {
    if (err) {
      console.error('Erro ao atualizar FUNCIONARIO:', err.message);
      logger.error(`Erro ao atualizar FUNCIONARIO: ${err.message}`);
      return res.status(500).json({ error: err.message });
    }
    if (result.affectedRows === 0) {
      console.log(`FUNCIONARIO com CPF ${cpf} não encontrado para atualização`);
      logger.info(`FUNCIONARIO com CPF ${cpf} não encontrado para atualização`);
      return res.status(404).json({ message: 'FUNCIONARIO não encontrado' });
    }
    console.log(`FUNCIONARIO com CPF ${cpf} atualizado com sucesso`);
    logger.info(`FUNCIONARIO com CPF ${cpf} atualizado com sucesso`);
    res.json({ message: 'FUNCIONARIO atualizado com sucesso' });
  });
});

router.delete('/:cpf', permitirTipos('administrador'), (req, res) => {
  const cpf = req.params.cpf;

  const sqlCheck = `
    SELECT COUNT(*) AS count 
    FROM PROCEDIMENTO 
    WHERE CPF_FUNCIONARIO_FK = ?
  `;

  db.query(sqlCheck, [cpf], (err, results) => {
    if (err) {
      console.error('Erro ao verificar procedimentos do funcionário:', err.message);
      logger.error(`Erro ao verificar procedimentos para funcionário ${cpf}: ${err.message}`);
      return res.status(500).json({ error: err.message });
    }

    if (results[0].count > 0) {
      logger.info(`Tentativa de deletar funcionário ${cpf} com procedimentos vinculados`);
      return res.status(400).json({ message: 'Funcionário possui procedimentos vinculados e não pode ser excluído.' });
    }

    const sqlDelete = `DELETE FROM FUNCIONARIO WHERE CPF_FUNCIONARIO = ?`;

    db.query(sqlDelete, [cpf], (err, result) => {
      if (err) {
        console.error('Erro ao deletar FUNCIONARIO:', err.message);
        logger.error(`Erro ao deletar FUNCIONARIO ${cpf}: ${err.message}`);
        return res.status(500).json({ error: err.message });
      }
      if (result.affectedRows === 0) {
        console.log(`FUNCIONARIO com CPF ${cpf} não encontrado para exclusão`);
        logger.info(`FUNCIONARIO com CPF ${cpf} não encontrado para exclusão`);
        return res.status(404).json({ message: 'FUNCIONARIO não encontrado' });
      }
      console.log(`FUNCIONARIO com CPF ${cpf} deletado com sucesso`);
      logger.info(`FUNCIONARIO com CPF ${cpf} deletado com sucesso`);
      res.json({ message: 'FUNCIONARIO deletado com sucesso' });
    });
  });
});


module.exports = router;
