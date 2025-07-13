

function permitirTipos(...tiposPermitidos) {
  return function (req, res, next) {
    const usuario = req.session.usuario;
    if (!usuario) {
      return res.status(401).json({ erro: 'Não autenticado' });
    }

    if (!tiposPermitidos.includes(usuario.tipo.toLowerCase())) {
      return res.status(403).json({ erro: 'Acesso negado' });
    }

    next();
  };
}

module.exports = permitirTipos;
