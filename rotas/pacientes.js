const express = require('express');
const router = express.Router();
const db = require('../db');  
const logger = require('../logger');
const permitirTipos = require('../meios/permitirTipos');

router.post('/',permitirTipos('administrador','enfermeiro', 'paciente'), (req, res) => {
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

router.get('/',permitirTipos('enfermeiro','Administrador'), (req, res) => {
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
router.get('/:cpf/historico', (req, res) => {
  const cpf = req.params.cpf;

  const sql = `
    SELECT * FROM PROCEDIMENTO
    WHERE CPF_PACIENTE_FK = ?
    ORDER BY DATA_HORARIO DESC
  `;

  db.query(sql, [cpf], (err, results) => {
    if (err) {
      logger.error(`Erro ao buscar histórico de procedimentos do paciente ${cpf}: ${err.message}`);
      return res.status(500).json({ error: err.message });
    }
    if (results.length === 0) {
      logger.info(`Nenhum procedimento encontrado para o paciente ${cpf}`);
      return res.status(404).json({ message: 'Nenhum procedimento encontrado para esse paciente' });
    }
    logger.info(`Histórico de procedimentos do paciente ${cpf} retornado com sucesso`);
    res.json(results);
  });
});

router.put('/:cpf', permitirTipos('administrador','enfermeiro'),(req, res) => {
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

router.delete('/:cpf',permitirTipos('administrador','enfermeiro', 'paciente'), (req, res) => {
  const cpf = req.params.cpf;

  const sqlCheck = `
    SELECT COUNT(*) AS count 
    FROM PROCEDIMENTO 
    WHERE CPF_PACIENTE_FK = ? AND STATUS_PROCEDIMENTO = 'Agendado'
  `;

  db.query(sqlCheck, [cpf], (err, results) => {
    if (err) {
      console.error('Erro ao verificar procedimentos:', err.message);
      logger.error(`Erro ao verificar procedimentos para paciente ${cpf}: ${err.message}`);
      return res.status(500).json({ error: err.message });
    }

    if (results[0].count > 0) {
      logger.info(`Tentativa de deletar paciente ${cpf} com procedimentos agendados`);
      return res.status(400).json({ message: 'Paciente possui procedimentos agendados e não pode ser excluído.' });
    }

    const sqlDelete = `DELETE FROM PACIENTE WHERE CPF_PACIENTE = ?`;

    db.query(sqlDelete, [cpf], (err, result) => {
      if (err) {
        console.error('Erro ao deletar paciente:', err.message);
        logger.error(`Erro ao deletar paciente ${cpf}: ${err.message}`);
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
});


module.exports = router;
