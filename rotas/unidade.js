const express = require('express');
const router = express.Router();
const db = require('../db');

// Inserir UNIDADE
router.post('/', (req, res) => {
  const { idUnidade, localizacao } = req.body;

  const sql = `
    INSERT INTO UNIDADE 
    (ID_UNIDADE, LOCALIZAÇÃO)
    VALUES (?, ?)
  `;

  db.query(sql, [idUnidade, localizacao], (err) => {
    if (err) {
      console.error('Erro ao inserir UNIDADE:', err.message);
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: 'UNIDADE inserida com sucesso' });
  });
});

// Buscar todas as UNIDADES
router.get('/', (req, res) => {
  const sql = `SELECT * FROM UNIDADE`;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Erro ao buscar UNIDADES:', err.message);
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Buscar UNIDADE por ID
router.get('/:id', (req, res) => {
  const id = req.params.id;

  const sql = `SELECT * FROM UNIDADE WHERE ID_UNIDADE = ?`;

  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error('Erro ao buscar UNIDADE:', err.message);
      return res.status(500).json({ error: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'UNIDADE não encontrada' });
    }
    res.json(results[0]);
  });
});

// Atualizar UNIDADE por ID
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const { localizacao } = req.body;

  const sql = `
    UPDATE UNIDADE SET
      LOCALIZAÇÃO = ?
    WHERE ID_UNIDADE = ?
  `;

  db.query(sql, [localizacao, id], (err, result) => {
    if (err) {
      console.error('Erro ao atualizar UNIDADE:', err.message);
      return res.status(500).json({ error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'UNIDADE não encontrada' });
    }
    res.json({ message: 'UNIDADE atualizada com sucesso' });
  });
});

// Deletar UNIDADE por ID
router.delete('/:id', (req, res) => {
  const id = req.params.id;

  const sql = `DELETE FROM UNIDADE WHERE ID_UNIDADE = ?`;

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Erro ao deletar UNIDADE:', err.message);
      return res.status(500).json({ error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'UNIDADE não encontrada' });
    }
    res.json({ message: 'UNIDADE deletada com sucesso' });
  });
});

module.exports = router;
