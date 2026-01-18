const Curso = require('./Curso');
const Disciplina = require('./Disciplina');
const DisciplinaCurso = require('./DisciplinaCurso');
const Pessoa = require('./Pessoa');
const Usuario = require('./Usuario');
const Cargo = require('./Cargo');
const Hierarquia = require('./Hierarquia');

// Associação N:N
Curso.belongsToMany(Disciplina, {
  through: DisciplinaCurso,
  foreignKey: 'curso_id'
});

Disciplina.belongsToMany(Curso, {
  through: DisciplinaCurso,
  foreignKey: 'disciplina_id'
});

Pessoa.belongsTo(Cargo, { foreignKey: 'cargo_id' });

Pessoa.hasOne(Usuario, {
  foreignKey: 'pessoa_id'
});

Usuario.belongsTo(Pessoa, { foreignKey: 'pessoa_id' });
Usuario.belongsTo(Hierarquia, { foreignKey: 'hierarquia_id' });

module.exports = {
  Curso,
  Disciplina,
  DisciplinaCurso,
Pessoa,
Usuario,
Cargo,
Hierarquia
};

