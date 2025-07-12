// rotas/index.js
const express = require('express');
const router = express.Router();

router.use('/pacientes', require('./pacientes'));
router.use('/funcionarios', require('./funcionario'));
router.use('/alteracoes-sistemicas', require('./alteracao_sistemica'));
router.use('/procedimentos', require('./procedimento'));
router.use('/prontuarios', require('./prontuario'));
router.use('/unidades', require('./unidade'));

module.exports = router;
