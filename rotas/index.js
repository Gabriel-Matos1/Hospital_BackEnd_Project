const express = require('express');
const router = express.Router();
const verificaLogin = require('../meios/verificaLogin'); 
router.use('/login', require('./login')); 
    
console.log('arquivo de index acessado');

router.use(verificaLogin); 
console.log('passou o verifica');
router.use('/pacientes', require('./pacientes'));
router.use('/funcionarios', require('./funcionario'));
router.use('/procedimentos', require('./procedimento'));
router.use('/prontuarios', require('./prontuario'));
router.use('/unidades', require('./unidade'));
router.use('/remedios', require('./remedio'));
router.use('/leitos', require('./leito'));

module.exports = router;
