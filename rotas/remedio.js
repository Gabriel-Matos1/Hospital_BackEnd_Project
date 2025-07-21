const express = require('express');
const router = express.Router();
const db = require('../db');
const logger = require('../logger');
const permitirTipos = require('../meios/permitirTipos');

router.post('/', permitirTipos('administrador', 'enfermeiro'), (req, res) => {
  const { id, nome, qtd } = req.body;

  const sql = `
    INSERT INTO REMEDIO (ID_REMEDIO, NOME, QTD)
    VALUES (?, ?, ?)
  `;

  db.query(sql, [id, nome, qtd], (err) => {
    if (err) {
      logger.error(`Erro ao inserir remédio ${id}: ${err.message}`);
      return res.status(500).json({ error: err.message });
    }
    logger.info(`Remédio ${id} inserido com sucesso`);
    res.status(201).json({ message: 'Remédio inserido com sucesso' });
  });
});

router.get('/', permitirTipos('administrador', 'enfermeiro', 'medico'), (req, res) => {
  const sql = `SELECT * FROM REMEDIO`;

  db.query(sql, (err, results) => {
    if (err) {
      logger.error(`Erro ao buscar remédios: ${err.message}`);
      return res.status(500).json({ error: err.message });
    }
    logger.info('Lista de remédios retornada com sucesso');
    res.json(results);
  });
});

router.get('/:id', permitirTipos('administrador', 'enfermeiro', 'medico'), (req, res) => {
  const id = req.params.id;

  const sql = `SELECT * FROM REMEDIO WHERE ID_REMEDIO = ?`;

  db.query(sql, [id], (err, results) => {
    if (err) {
      logger.error(`Erro ao buscar remédio ${id}: ${err.message}`);
      return res.status(500).json({ error: err.message });
    }
    if (results.length === 0) {
      logger.info(`Remédio ${id} não encontrado`);
      return res.status(404).json({ message: 'Remédio não encontrado' });
    }
    logger.info(`Remédio ${id} retornado com sucesso`);
    res.json(results[0]);
  });
});

router.put('/:id', permitirTipos('administrador', 'enfermeiro'), (req, res) => {
  const id = req.params.id;
  const { nome, qtd } = req.body;

  const sql = `
    UPDATE REMEDIO
    SET NOME = ?, QTD = ?
    WHERE ID_REMEDIO = ?
  `;

  db.query(sql, [nome, qtd, id], (err, result) => {
    if (err) {
      logger.error(`Erro ao atualizar remédio ${id}: ${err.message}`);
      return res.status(500).json({ error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Remédio não encontrado' });
    }
    logger.info(`Remédio ${id} atualizado com sucesso`);
    res.json({ message: 'Remédio atualizado com sucesso' });
  });
});

router.delete('/:id', permitirTipos('administrador'), (req, res) => {
  const id = req.params.id;

  const sql = `DELETE FROM REMEDIO WHERE ID_REMEDIO = ?`;

  db.query(sql, [id], (err, result) => {
    if (err) {
      logger.error(`Erro ao deletar remédio ${id}: ${err.message}`);
      return res.status(500).json({ error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Remédio não encontrado' });
    }
    logger.info(`Remédio ${id} deletado com sucesso`);
    res.json({ message: 'Remédio deletado com sucesso' });
  });
});

module.exports = router;
