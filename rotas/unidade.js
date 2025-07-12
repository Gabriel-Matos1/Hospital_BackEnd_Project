const express = require('express');
const router = express.Router();
const db = require('../db');
const logger = require('../logger'); // importa o logger

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
      logger.error(`Erro ao inserir UNIDADE: ${err.message}`);
      return res.status(500).json({ error: err.message });
    }
    console.log(`UNIDADE ${idUnidade} inserida com sucesso`);
    logger.info(`UNIDADE ${idUnidade} inserida com sucesso`);
    res.status(201).json({ message: 'UNIDADE inserida com sucesso' });
  });
});

// Buscar todas as UNIDADES
router.get('/', (req, res) => {
  const sql = `SELECT * FROM UNIDADE`;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Erro ao buscar UNIDADES:', err.message);
      logger.error(`Erro ao buscar UNIDADES: ${err.message}`);
      return res.status(500).json({ error: err.message });
    }
    console.log('Lista de UNIDADES retornada com sucesso');
    logger.info('Lista de UNIDADES retornada com sucesso');
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
      logger.error(`Erro ao buscar UNIDADE ${id}: ${err.message}`);
      return res.status(500).json({ error: err.message });
    }
    if (results.length === 0) {
      console.log(`UNIDADE ${id} não encontrada`);
      logger.info(`UNIDADE ${id} não encontrada`);
      return res.status(404).json({ message: 'UNIDADE não encontrada' });
    }
    console.log(`UNIDADE ${id} retornada com sucesso`);
    logger.info(`UNIDADE ${id} retornada com sucesso`);
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
      logger.error(`Erro ao atualizar UNIDADE ${id}: ${err.message}`);
      return res.status(500).json({ error: err.message });
    }
    if (result.affectedRows === 0) {
      console.log(`UNIDADE ${id} não encontrada para atualização`);
      logger.info(`UNIDADE ${id} não encontrada para atualização`);
      return res.status(404).json({ message: 'UNIDADE não encontrada' });
    }
    console.log(`UNIDADE ${id} atualizada com sucesso`);
    logger.info(`UNIDADE ${id} atualizada com sucesso`);
    res.json({ message: 'UNIDADE atualizada com sucesso' });
  });
});

// Deletar UNIDADE por ID - com verificação de funcionários vinculados
router.delete('/:id', (req, res) => {
  const id = req.params.id;

  // 1. Verificar se existem funcionários vinculados a essa unidade
  const checkFuncionariosSql = `SELECT COUNT(*) AS total FROM FUNCIONARIO WHERE ID_UNIDADE_FK = ?`;

  db.query(checkFuncionariosSql, [id], (err, results) => {
    if (err) {
      console.error('Erro ao verificar funcionários:', err.message);
      logger.error(`Erro ao verificar funcionários da unidade ${id}: ${err.message}`);
      return res.status(500).json({ error: err.message });
    }

    const totalFuncionarios = results[0].total;
    if (totalFuncionarios > 0) {
      // Não pode deletar pois existem funcionários vinculados
      const msg = `Não é possível deletar a UNIDADE ${id} pois possui ${totalFuncionarios} funcionário(s) vinculado(s).`;
      console.log(msg);
      logger.info(msg);
      return res.status(400).json({ message: msg });
    }

    // 2. Se não houver funcionários, pode deletar a unidade
    const deleteSql = `DELETE FROM UNIDADE WHERE ID_UNIDADE = ?`;

    db.query(deleteSql, [id], (err, result) => {
      if (err) {
        console.error('Erro ao deletar UNIDADE:', err.message);
        logger.error(`Erro ao deletar UNIDADE ${id}: ${err.message}`);
        return res.status(500).json({ error: err.message });
      }
      if (result.affectedRows === 0) {
        console.log(`UNIDADE ${id} não encontrada para exclusão`);
        logger.info(`UNIDADE ${id} não encontrada para exclusão`);
        return res.status(404).json({ message: 'UNIDADE não encontrada' });
      }
      console.log(`UNIDADE ${id} deletada com sucesso`);
      logger.info(`UNIDADE ${id} deletada com sucesso`);
      res.json({ message: 'UNIDADE deletada com sucesso' });
    });
  });
});

module.exports = router;
