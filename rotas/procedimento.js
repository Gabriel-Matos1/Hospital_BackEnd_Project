const express = require('express');
const router = express.Router();
const db = require('../db');

// Inserir PROCEDIMENTO
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
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: 'PROCEDIMENTO inserido com sucesso' });
  });
});

// Buscar todos os PROCEDIMENTOS
router.get('/', (req, res) => {
  const sql = `SELECT * FROM PROCEDIMENTO`;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Erro ao buscar PROCEDIMENTOS:', err.message);
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Buscar PROCEDIMENTO por ID
router.get('/:id', (req, res) => {
  const id = req.params.id;

  const sql = `SELECT * FROM PROCEDIMENTO WHERE ID_PROCEDIMENTO = ?`;

  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error('Erro ao buscar PROCEDIMENTO:', err.message);
      return res.status(500).json({ error: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'PROCEDIMENTO não encontrado' });
    }
    res.json(results[0]);
  });
});

// Atualizar PROCEDIMENTO por ID
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
      return res.status(500).json({ error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'PROCEDIMENTO não encontrado' });
    }
    res.json({ message: 'PROCEDIMENTO atualizado com sucesso' });
  });
});

// Deletar PROCEDIMENTO por ID
router.delete('/:id', (req, res) => {
  const id = req.params.id;

  const sql = `DELETE FROM PROCEDIMENTO WHERE ID_PROCEDIMENTO = ?`;

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Erro ao deletar PROCEDIMENTO:', err.message);
      return res.status(500).json({ error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'PROCEDIMENTO não encontrado' });
    }
    res.json({ message: 'PROCEDIMENTO deletado com sucesso' });
  });
});

module.exports = router;
