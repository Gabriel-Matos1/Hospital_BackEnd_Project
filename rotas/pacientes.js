const express = require('express');
const router = express.Router();
const db = require('../db');  // ajuste o caminho conforme sua estrutura

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
      console.error('Erro ao inserir paciente:', err.message);
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: 'Paciente inserido com sucesso' });
  });
});

// Buscar todos os pacientes
router.get('/', (req, res) => {
  const sql = `SELECT * FROM PACIENTE`;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Erro ao buscar pacientes:', err.message);
      return res.status(500).json({ error: err.message });
    }
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
      return res.status(500).json({ error: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Paciente não encontrado' });
    }
    res.json(results[0]);
  });
});

// Atualizar paciente pelo CPF
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
      return res.status(500).json({ error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Paciente não encontrado' });
    }
    res.json({ message: 'Paciente atualizado com sucesso' });
  });
});

// Deletar paciente pelo CPF
router.delete('/:cpf', (req, res) => {
  const cpf = req.params.cpf;

  const sql = `DELETE FROM PACIENTE WHERE CPF_PACIENTE = ?`;

  db.query(sql, [cpf], (err, result) => {
    if (err) {
      console.error('Erro ao deletar paciente:', err.message);
      return res.status(500).json({ error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Paciente não encontrado' });
    }
    res.json({ message: 'Paciente deletado com sucesso' });
  });
});

module.exports = router;
