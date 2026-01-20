const { Curso, Disciplina } = require('../models');

// ==== CRUD EXISTENTE (SEM ALTERAÇÃO) ====

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

// ==== NOVO: ASSOCIAÇÃO CURSO ↔ DISCIPLINAS ====

/**
 * LISTAR DISCIPLINAS ASSOCIADAS AO CURSO
 */
exports.listDisciplinas = async (req, res) => {
  const curso = await Curso.findByPk(req.params.id, {
    include: [{ model: Disciplina, as: 'disciplinas' }]
  });

  if (!curso) {
    return res.status(404).json({ error: 'Curso não encontrado' });
  }

  res.json(curso.disciplinas);
};

/**
 * ATUALIZAR DISCIPLINAS DO CURSO
 * (substitui todas as associações)
 */
exports.updateDisciplinas = async (req, res) => {
  const { disciplinas } = req.body;

  if (!Array.isArray(disciplinas)) {
    return res.status(400).json({ error: 'disciplinas deve ser um array' });
  }

  const curso = await Curso.findByPk(req.params.id);

  if (!curso) {
    return res.status(404).json({ error: 'Curso não encontrado' });
  }

  await curso.setDisciplinas(disciplinas);

  res.json({ message: 'Disciplinas associadas com sucesso' });
};
