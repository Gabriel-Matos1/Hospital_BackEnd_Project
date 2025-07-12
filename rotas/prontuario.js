const express = require('express');
const router = express.Router();
const db = require('../db');

// Inserir PRONTUARIO
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
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: 'PRONTUARIO inserido com sucesso' });
  });
});

// Buscar todos os PRONTUARIOS
router.get('/', (req, res) => {
  const sql = `SELECT * FROM PRONTUARIO`;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Erro ao buscar PRONTUARIOS:', err.message);
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Buscar PRONTUARIO por ID
router.get('/:id', (req, res) => {
  const id = req.params.id;

  const sql = `SELECT * FROM PRONTUARIO WHERE ID_PRONTUARIO = ?`;

  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error('Erro ao buscar PRONTUARIO:', err.message);
      return res.status(500).json({ error: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'PRONTUARIO não encontrado' });
    }
    res.json(results[0]);
  });
});

// Atualizar PRONTUARIO por ID
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
      return res.status(500).json({ error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'PRONTUARIO não encontrado' });
    }
    res.json({ message: 'PRONTUARIO atualizado com sucesso' });
  });
});

// Deletar PRONTUARIO por ID
router.delete('/:id', (req, res) => {
  const id = req.params.id;

  const sql = `DELETE FROM PRONTUARIO WHERE ID_PRONTUARIO = ?`;

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Erro ao deletar PRONTUARIO:', err.message);
      return res.status(500).json({ error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'PRONTUARIO não encontrado' });
    }
    res.json({ message: 'PRONTUARIO deletado com sucesso' });
  });
});

module.exports = router;
