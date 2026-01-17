const Curso = require('./Curso');
const Disciplina = require('./Disciplina');
const DisciplinaCurso = require('./DisciplinaCurso');

// Associação N:N
Curso.belongsToMany(Disciplina, {
  through: DisciplinaCurso,
  foreignKey: 'curso_id'
});

Disciplina.belongsToMany(Curso, {
  through: DisciplinaCurso,
  foreignKey: 'disciplina_id'
});

module.exports = {
  Curso,
  Disciplina,
  DisciplinaCurso
};