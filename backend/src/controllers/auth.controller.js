const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const { login, senha } = req.body;

  const user = await Usuario.findOne({
    where: { login },
    include: ['Tb_Hierarquia', 'Tb_Pessoa']
  });

  if (!user || !(await bcrypt.compare(senha, user.senha))) {
    return res.status(401).json({ error: 'Credenciais inválidas' });
  }

  const token = jwt.sign(
    { id: user.id, role: user.Tb_Hierarquia.descricao },
    process.env.JWT_SECRET,
    { expiresIn: '8h' }
  );

  res.json({ token });
};
