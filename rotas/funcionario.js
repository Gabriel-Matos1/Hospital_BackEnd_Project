const express = require('express');
const router = express.Router();
const db = require('../db');  // ajuste o caminho se necessário

// Inserir FUNCIONARIO
router.post('/', (req, res) => {
  const { cpf, tipo, nome, idade, idUnidade, dataNascimento } = req.body;

  const sql = `
    INSERT INTO FUNCIONARIO 
    (CPF_FUNCIONARIO, TIPO, NOME, IDADE, ID_UNIDADE_FK, DATA_NASCIMENTO)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [cpf, tipo, nome, idade, idUnidade, dataNascimento], (err) => {
    if (err) {
      console.error('Erro ao inserir FUNCIONARIO:', err.message);
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: 'FUNCIONARIO inserido com sucesso' });
  });
});

// Buscar todos os FUNCIONARIOS
router.get('/', (req, res) => {
  const sql = `SELECT * FROM FUNCIONARIO`;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Erro ao buscar FUNCIONARIOS:', err.message);
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Buscar FUNCIONARIO por CPF
router.get('/:cpf', (req, res) => {
  const cpf = req.params.cpf;

  const sql = `SELECT * FROM FUNCIONARIO WHERE CPF_FUNCIONARIO = ?`;

  db.query(sql, [cpf], (err, results) => {
    if (err) {
      console.error('Erro ao buscar FUNCIONARIO:', err.message);
      return res.status(500).json({ error: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'FUNCIONARIO não encontrado' });
    }
    res.json(results[0]);
  });
});

// Atualizar FUNCIONARIO por CPF
router.put('/:cpf', (req, res) => {
  const cpf = req.params.cpf;
  const { tipo, nome, idade, idUnidade, dataNascimento } = req.body;

  const sql = `
    UPDATE FUNCIONARIO SET
      TIPO = ?,
      NOME = ?,
      IDADE = ?,
      ID_UNIDADE_FK = ?,
      DATA_NASCIMENTO = ?
    WHERE CPF_FUNCIONARIO = ?
  `;

  db.query(sql, [tipo, nome, idade, idUnidade, dataNascimento, cpf], (err, result) => {
    if (err) {
      console.error('Erro ao atualizar FUNCIONARIO:', err.message);
      return res.status(500).json({ error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'FUNCIONARIO não encontrado' });
    }
    res.json({ message: 'FUNCIONARIO atualizado com sucesso' });
  });
});

// Deletar FUNCIONARIO por CPF
router.delete('/:cpf', (req, res) => {
  const cpf = req.params.cpf;

  const sql = `DELETE FROM FUNCIONARIO WHERE CPF_FUNCIONARIO = ?`;

  db.query(sql, [cpf], (err, result) => {
    if (err) {
      console.error('Erro ao deletar FUNCIONARIO:', err.message);
      return res.status(500).json({ error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'FUNCIONARIO não encontrado' });
    }
    res.json({ message: 'FUNCIONARIO deletado com sucesso' });
  });
});

module.exports = router;
