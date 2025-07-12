const express = require('express');
const router = express.Router();
const db = require('../db'); // ajuste se o caminho for diferente

// Inserir ALTERACAO_SISTEMICA
router.post('/', (req, res) => {
  const { idAlteracao, idProcedimento, observacao, autorAlteracao, tipoAutor } = req.body;

  const sql = `
    INSERT INTO ALTERACAO_SISTEMICA 
    (ID_ALTERACAO, ID_PROCEDIMENTO_FK, OBSERVACAO, AUTOR_ALTERACAO, TIPO_AUTOR)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(sql, [idAlteracao, idProcedimento, observacao, autorAlteracao, tipoAutor], (err) => {
    if (err) {
      console.error('Erro ao inserir ALTERACAO_SISTEMICA:', err.message);
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: 'ALTERACAO_SISTEMICA inserida com sucesso' });
  });
});

// Buscar todas
router.get('/', (req, res) => {
  const sql = `SELECT * FROM ALTERACAO_SISTEMICA`;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Erro ao buscar ALTERACAO_SISTEMICA:', err.message);
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Buscar por ID_ALTERACAO
router.get('/:id', (req, res) => {
  const id = req.params.id;

  const sql = `SELECT * FROM ALTERACAO_SISTEMICA WHERE ID_ALTERACAO = ?`;

  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error('Erro ao buscar ALTERACAO_SISTEMICA:', err.message);
      return res.status(500).json({ error: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'ALTERACAO_SISTEMICA não encontrada' });
    }
    res.json(results[0]);
  });
});

// Atualizar por ID_ALTERACAO
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const { idProcedimento, observacao, autorAlteracao, tipoAutor } = req.body;

  const sql = `
    UPDATE ALTERACAO_SISTEMICA SET
      ID_PROCEDIMENTO_FK = ?,
      OBSERVACAO = ?,
      AUTOR_ALTERACAO = ?,
      TIPO_AUTOR = ?
    WHERE ID_ALTERACAO = ?
  `;

  db.query(sql, [idProcedimento, observacao, autorAlteracao, tipoAutor, id], (err, result) => {
    if (err) {
      console.error('Erro ao atualizar ALTERACAO_SISTEMICA:', err.message);
      return res.status(500).json({ error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'ALTERACAO_SISTEMICA não encontrada' });
    }
    res.json({ message: 'ALTERACAO_SISTEMICA atualizada com sucesso' });
  });
});

// Deletar por ID_ALTERACAO
router.delete('/:id', (req, res) => {
  const id = req.params.id;

  const sql = `DELETE FROM ALTERACAO_SISTEMICA WHERE ID_ALTERACAO = ?`;

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Erro ao deletar ALTERACAO_SISTEMICA:', err.message);
      return res.status(500).json({ error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'ALTERACAO_SISTEMICA não encontrada' });
    }
    res.json({ message: 'ALTERACAO_SISTEMICA deletada com sucesso' });
  });
});

module.exports = router;
