const Curso = require('../models/Curso');

exports.create = async (req, res) => {
  const curso = await Curso.create(req.body);
  res.status(201).json(curso);
};

exports.findAll = async (req, res) => {
  const cursos = await Curso.findAll();
  res.json(cursos);
};

exports.findById = async (req, res) => {
  const curso = await Curso.findByPk(req.params.id);
  if (!curso) return res.status(404).json({ error: 'Curso não encontrado' });
  res.json(curso);
};

exports.update = async (req, res) => {
  const curso = await Curso.findByPk(req.params.id);
  if (!curso) return res.status(404).json({ error: 'Curso não encontrado' });

  await curso.update(req.body);
  res.json(curso);
};

exports.remove = async (req, res) => {
  const curso = await Curso.findByPk(req.params.id);
  if (!curso) return res.status(404).json({ error: 'Curso não encontrado' });

  await curso.destroy();
  res.status(204).send();
};
