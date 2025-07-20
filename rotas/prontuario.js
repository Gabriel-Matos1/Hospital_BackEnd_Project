const express = require('express');
const router = express.Router();
const db = require('../db');
const logger = require('../logger');  // importe o logger

router.post('/', (req, res) => {
  const { idProntuario, idProcedimento, observacao } = req.body;

  const sql = `
    INSERT INTO PRONTUARIO 
    (ID_PRONTUARIO, ID_PROCEDIMENTO_FK, OBSERVACAO)
    VALUES (?, ?, ?)
  `;

  db.query(sql, [idProntuario, idProcedimento, observacao], (err) => {
    if (err) {
      console.error('Erro ao inserir PRONTUARIO:', err.message);
      logger.error(`Erro ao inserir PRONTUARIO: ${err.message}`);
      return res.status(500).json({ error: err.message });
    }
    console.log(`PRONTUARIO ${idProntuario} inserido com sucesso`);
    logger.info(`PRONTUARIO ${idProntuario} inserido com sucesso`);
    res.status(201).json({ message: 'PRONTUARIO inserido com sucesso' });
  });
});

router.get('/', (req, res) => {
  const sql = `SELECT * FROM PRONTUARIO`;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Erro ao buscar PRONTUARIOS:', err.message);
      logger.error(`Erro ao buscar PRONTUARIOS: ${err.message}`);
      return res.status(500).json({ error: err.message });
    }
    console.log('Lista de PRONTUARIOS retornada com sucesso');
    logger.info('Lista de PRONTUARIOS retornada com sucesso');
    res.json(results);
  });
});

router.get('/:id', (req, res) => {
  const id = req.params.id;

  const sql = `SELECT * FROM PRONTUARIO WHERE ID_PRONTUARIO = ?`;

  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error('Erro ao buscar PRONTUARIO:', err.message);
      logger.error(`Erro ao buscar PRONTUARIO ${id}: ${err.message}`);
      return res.status(500).json({ error: err.message });
    }
    if (results.length === 0) {
      console.log(`PRONTUARIO ${id} não encontrado`);
      logger.info(`PRONTUARIO ${id} não encontrado`);
      return res.status(404).json({ message: 'PRONTUARIO não encontrado' });
    }
    console.log(`PRONTUARIO ${id} retornado com sucesso`);
    logger.info(`PRONTUARIO ${id} retornado com sucesso`);
    res.json(results[0]);
  });
});

router.put('/:id', (req, res) => {
  const id = req.params.id;
  const { idProcedimento, observacao } = req.body;

  const sql = `
    UPDATE PRONTUARIO SET
      ID_PROCEDIMENTO_FK = ?,
      OBSERVACAO = ?
    WHERE ID_PRONTUARIO = ?
  `;

  db.query(sql, [idProcedimento, observacao, id], (err, result) => {
    if (err) {
      console.error('Erro ao atualizar PRONTUARIO:', err.message);
      logger.error(`Erro ao atualizar PRONTUARIO ${id}: ${err.message}`);
      return res.status(500).json({ error: err.message });
    }
    if (result.affectedRows === 0) {
      console.log(`PRONTUARIO ${id} não encontrado para atualização`);
      logger.info(`PRONTUARIO ${id} não encontrado para atualização`);
      return res.status(404).json({ message: 'PRONTUARIO não encontrado' });
    }
    console.log(`PRONTUARIO ${id} atualizado com sucesso`);
    logger.info(`PRONTUARIO ${id} atualizado com sucesso`);
    res.json({ message: 'PRONTUARIO atualizado com sucesso' });
  });
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;

  const sql = `DELETE FROM PRONTUARIO WHERE ID_PRONTUARIO = ?`;

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Erro ao deletar PRONTUARIO:', err.message);
      logger.error(`Erro ao deletar PRONTUARIO ${id}: ${err.message}`);
      return res.status(500).json({ error: err.message });
    }
    if (result.affectedRows === 0) {
      console.log(`PRONTUARIO ${id} não encontrado para exclusão`);
      logger.info(`PRONTUARIO ${id} não encontrado para exclusão`);
      return res.status(404).json({ message: 'PRONTUARIO não encontrado' });
    }
    console.log(`PRONTUARIO ${id} deletado com sucesso`);
    logger.info(`PRONTUARIO ${id} deletado com sucesso`);
    res.json({ message: 'PRONTUARIO deletado com sucesso' });
  });
});

module.exports = router;
