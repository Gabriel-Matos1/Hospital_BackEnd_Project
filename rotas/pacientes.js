const express = require('express');
const router = express.Router();
const db = require('../db');  // ajuste o caminho conforme sua estrutura
const logger = require('../logger');
// Inserir paciente
router.post('/', (req, res) => {
  const { cpf, nome, idade, convenio, observacao, dataNascimento } = req.body;

  const sql = `
    INSERT INTO PACIENTE 
    (CPF_PACIENTE, NOME, IDADE, CONVENIO, OBSERVACAO, DATA_NASCIMENTO)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [cpf, nome, idade, convenio, observacao, dataNascimento], (err) => {
    if (err) {
      logger.error(`Erro ao inserir paciente com CPF ${cpf}: ${err.message}`);
      return res.status(500).json({ error: err.message });
    }
    logger.info(`Paciente com CPF ${cpf} inserido com sucesso`);
    res.status(201).json({ message: 'Paciente inserido com sucesso' });
  });
});

// Buscar todos os pacientes
router.get('/', (req, res) => {
  const sql = `SELECT * FROM PACIENTE`;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Erro ao buscar pacientes:', err.message);
      logger.error(`Erro ao buscar pacientes: ${err.message}`);
      return res.status(500).json({ error: err.message });
    }
    logger.info('Lista de pacientes retornada com sucesso');
    res.json(results);
  });
});

// Buscar paciente pelo CPF
router.get('/:cpf', (req, res) => {
  const cpf = req.params.cpf;

  const sql = `SELECT * FROM PACIENTE WHERE CPF_PACIENTE = ?`;

  db.query(sql, [cpf], (err, results) => {
    if (err) {
      console.error('Erro ao buscar paciente:', err.message);
      logger.error(`Erro ao buscar pacientes: ${err.message}`);
 
      return res.status(500).json({ error: err.message });
    }
    if (results.length === 0) {
      logger.info(`Paciente com cpf ${cpf}  não encontrado`);
      return res.status(404).json({ message: 'Paciente não encontrado' });
    }
    logger.info(`Paciente com cpf ${cpf} retornado com sucesso`);

    res.json(results[0]);
  });
});

router.put('/:cpf', (req, res) => {
  const cpf = req.params.cpf;
  const { nome, idade, convenio, observacao, dataNascimento } = req.body;

  const sql = `
    UPDATE PACIENTE SET
      NOME = ?,
      IDADE = ?,
      CONVENIO = ?,
      OBSERVACAO = ?,
      DATA_NASCIMENTO = ?
    WHERE CPF_PACIENTE = ?
  `;

  db.query(sql, [nome, idade, convenio, observacao, dataNascimento, cpf], (err, result) => {
    if (err) {
      console.error('Erro ao atualizar paciente:', err.message);
      logger.error(`Erro ao atualizar pacientes: ${err.message}`);
      return res.status(500).json({ error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Paciente não encontrado' });
    }
    logger.info(`Paciente com cpf ${cpf} atualizado com sucesso`);

    res.json({ message: `Paciente com cpf ${cpf} atualizado com sucesso`});
  });
});

// Deletar paciente pelo CPF
router.delete('/:cpf', (req, res) => {
  const cpf = req.params.cpf;

  const sql = `DELETE FROM PACIENTE WHERE CPF_PACIENTE = ?`;

  db.query(sql, [cpf], (err, result) => {
    if (err) {
      console.error('Erro ao deletar paciente:', err.message);
      logger.error(`Erro ao deletar pacientes: ${err.message}`);
      return res.status(500).json({ error: err.message });
    }
    if (result.affectedRows === 0) {
      logger.info(`Paciente com cpf ${cpf} não encontrado`);

      return res.status(404).json({ message: 'Paciente não encontrado' });
    }
    logger.info(`Paciente com cpf ${cpf} deletado com sucesso`);

    res.json({ message: 'Paciente deletado com sucesso' });
  });
});

module.exports = router;
