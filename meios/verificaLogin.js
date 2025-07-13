// meios/verificaLogin.js
function verificaLogin(req, res, next) {
  console.log('Middleware verificaLogin chamado');
  if (req.session && req.session.usuario) {
    console.log('Sessão válida:', req.session.usuario);
    return next();
  } else {
    console.log('Sessão ausente ou inválida');
    return res.status(401).json({ error: 'Não autorizado. Faça login.' });
  }
}

module.exports = verificaLogin;
