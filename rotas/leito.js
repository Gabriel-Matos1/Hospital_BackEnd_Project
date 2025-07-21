const express = require('express');
const router = express.Router();
const db = require('../db');
const logger = require('../logger');
const permitirTipos = require('../meios/permitirTipos');


router.post('/', permitirTipos('administrador'), (req, res) => {
  const { id_leito, id_unidade, status, id_paciente_fk } = req.body;

  const sql = `
    INSERT INTO LEITOS 
    (ID_LEITO, ID_UNIDADE, STATUS, ID_PACIENTE_FK)
    VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [id_leito, id_unidade, status, id_paciente_fk], (err) => {
    if (err) {
      logger.error(`Erro ao inserir leito ${id_leito}: ${err.message}`);
      return res.status(500).json({ error: err.message });
    }
    logger.info(`Leito ${id_leito} inserido com sucesso`);
    res.status(201).json({ message: 'Leito inserido com sucesso' });
  });
});


router.get('/', permitirTipos('administrador', 'enfermeiro'), (req, res) => {
  const sql = `SELECT * FROM LEITOS`;

  db.query(sql, (err, results) => {
    if (err) {
      logger.error(`Erro ao buscar leitos: ${err.message}`);
      return res.status(500).json({ error: err.message });
    }
    logger.info('Lista de leitos retornada com sucesso');
    res.json(results);
  });
});


router.get('/:id',permitirTipos('administrador', 'enfermeiro', 'medico'), (req, res) => {
  const id = req.params.id;

  const sql = `SELECT * FROM LEITOS WHERE ID_LEITO = ?`;

  db.query(sql, [id], (err, results) => {
    if (err) {
      logger.error(`Erro ao buscar leito ${id}: ${err.message}`);
      return res.status(500).json({ error: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Leito não encontrado' });
    }
    logger.info(`Leito ${id} retornado com sucesso`);
    res.json(results[0]);
  });
});


router.put('/:id', permitirTipos('administrador', 'enfermeiro'), (req, res) => {
  const id = req.params.id;
  const { id_unidade, status, id_paciente_fk } = req.body;

  const sql = `
    UPDATE LEITOS SET
      ID_UNIDADE = ?,
      STATUS = ?,
      ID_PACIENTE_FK = ?
    WHERE ID_LEITO = ?
  `;

  db.query(sql, [id_unidade, status, id_paciente_fk, id], (err, result) => {
    if (err) {
      logger.error(`Erro ao atualizar leito ${id}: ${err.message}`);
      return res.status(500).json({ error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Leito não encontrado' });
    }
    logger.info(`Leito ${id} atualizado com sucesso`);
    res.json({ message: 'Leito atualizado com sucesso' });
  });
});

router.delete('/:id', permitirTipos('administrador'), (req, res) => {
  const id = req.params.id;

  const sql = `DELETE FROM LEITOS WHERE ID_LEITO = ?`;

  db.query(sql, [id], (err, result) => {
    if (err) {
      logger.error(`Erro ao deletar leito ${id}: ${err.message}`);
      return res.status(500).json({ error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Leito não encontrado' });
    }
    logger.info(`Leito ${id} deletado com sucesso`);
    res.json({ message: 'Leito deletado com sucesso' });
  });
});

module.exports = router;
