const express = require('express');
const router = express.Router();
const db = require('../db');
const logger = require('../logger'); 

router.post('/', (req, res) => {
  const {
    idProcedimento,
    cpfPaciente,
    cpfFuncionario,
    dataHorario,
    tipo,
    statusProcedimento,
    idProntuario
  } = req.body;

  const sql = `
    INSERT INTO PROCEDIMENTO 
    (ID_PROCEDIMENTO, CPF_PACIENTE_FK, CPF_FUNCIONARIO_FK, DATA_HORARIO, TIPO, STATUS_PROCEDIMENTO, ID_PRONTUARIO)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [
    idProcedimento,
    cpfPaciente,
    cpfFuncionario,
    dataHorario,
    tipo,
    statusProcedimento,
    idProntuario
  ], (err) => {
    if (err) {
      console.error('Erro ao inserir PROCEDIMENTO:', err.message);
      logger.error(`Erro ao inserir PROCEDIMENTO: ${err.message}`);
      return res.status(500).json({ error: err.message });
    }
    console.log(`PROCEDIMENTO ${idProcedimento} inserido com sucesso`);
    logger.info(`PROCEDIMENTO ${idProcedimento} inserido com sucesso`);
    res.status(201).json({ message: 'PROCEDIMENTO inserido com sucesso' });
  });
});

router.get('/', (req, res) => {
  const sql = `SELECT * FROM PROCEDIMENTO`;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Erro ao buscar PROCEDIMENTOS:', err.message);
      logger.error(`Erro ao buscar PROCEDIMENTOS: ${err.message}`);
      return res.status(500).json({ error: err.message });
    }
    console.log('Lista de PROCEDIMENTOS retornada com sucesso');
    logger.info('Lista de PROCEDIMENTOS retornada com sucesso');
    res.json(results);
  });
});

router.get('/:id', (req, res) => {
  const id = req.params.id;

  const sql = `SELECT * FROM PROCEDIMENTO WHERE ID_PROCEDIMENTO = ?`;

  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error('Erro ao buscar PROCEDIMENTO:', err.message);
      logger.error(`Erro ao buscar PROCEDIMENTO ${id}: ${err.message}`);
      return res.status(500).json({ error: err.message });
    }
    if (results.length === 0) {
      console.log(`PROCEDIMENTO ${id} não encontrado`);
      logger.info(`PROCEDIMENTO ${id} não encontrado`);
      return res.status(404).json({ message: 'PROCEDIMENTO não encontrado' });
    }
    console.log(`PROCEDIMENTO ${id} retornado com sucesso`);
    logger.info(`PROCEDIMENTO ${id} retornado com sucesso`);
    res.json(results[0]);
  });
});

router.put('/:id', (req, res) => {
  const id = req.params.id;
  const {
    cpfPaciente,
    cpfFuncionario,
    dataHorario,
    tipo,
    statusProcedimento,
    idProntuario
  } = req.body;

  const sql = `
    UPDATE PROCEDIMENTO SET
      CPF_PACIENTE_FK = ?,
      CPF_FUNCIONARIO_FK = ?,
      DATA_HORARIO = ?,
      TIPO = ?,
      STATUS_PROCEDIMENTO = ?,
      ID_PRONTUARIO = ?
    WHERE ID_PROCEDIMENTO = ?
  `;

  db.query(sql, [
    cpfPaciente,
    cpfFuncionario,
    dataHorario,
    tipo,
    statusProcedimento,
    idProntuario,
    id
  ], (err, result) => {
    if (err) {
      console.error('Erro ao atualizar PROCEDIMENTO:', err.message);
      logger.error(`Erro ao atualizar PROCEDIMENTO ${id}: ${err.message}`);
      return res.status(500).json({ error: err.message });
    }
    if (result.affectedRows === 0) {
      console.log(`PROCEDIMENTO ${id} não encontrado para atualização`);
      logger.info(`PROCEDIMENTO ${id} não encontrado para atualização`);
      return res.status(404).json({ message: 'PROCEDIMENTO não encontrado' });
    }
    console.log(`PROCEDIMENTO ${id} atualizado com sucesso`);
    logger.info(`PROCEDIMENTO ${id} atualizado com sucesso`);
    res.json({ message: 'PROCEDIMENTO atualizado com sucesso' });
  });
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;

  const sql = `DELETE FROM PROCEDIMENTO WHERE ID_PROCEDIMENTO = ?`;

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Erro ao deletar PROCEDIMENTO:', err.message);
      logger.error(`Erro ao deletar PROCEDIMENTO ${id}: ${err.message}`);
      return res.status(500).json({ error: err.message });
    }
    if (result.affectedRows === 0) {
      console.log(`PROCEDIMENTO ${id} não encontrado para exclusão`);
      logger.info(`PROCEDIMENTO ${id} não encontrado para exclusão`);
      return res.status(404).json({ message: 'PROCEDIMENTO não encontrado' });
    }
    console.log(`PROCEDIMENTO ${id} deletado com sucesso`);
    logger.info(`PROCEDIMENTO ${id} deletado com sucesso`);
    res.json({ message: 'PROCEDIMENTO deletado com sucesso' });
  });
});

module.exports = router;
