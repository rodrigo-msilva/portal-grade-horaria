const Disciplina = require('../models/Disciplina');

exports.create = async (req, res) => {
  const disciplina = await Disciplina.create(req.body);
  res.status(201).json(disciplina);
};

exports.findAll = async (req, res) => {
  const disciplinas = await Disciplina.findAll();
  res.json(disciplinas);
};

exports.update = async (req, res) => {
  const disciplina = await Disciplina.findByPk(req.params.id);
  if (!disciplina) {
    return res.status(404).json({ error: 'Disciplina não encontrada' });
  }

  await disciplina.update(req.body);
  res.json(disciplina);
};

exports.remove = async (req, res) => {
  const disciplina = await Disciplina.findByPk(req.params.id);
  if (!disciplina) {
    return res.status(404).json({ error: 'Disciplina não encontrada' });
  }

  await disciplina.destroy();
  res.status(204).send();
};
