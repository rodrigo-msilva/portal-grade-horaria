const Curso = require('./Curso');
const Disciplina = require('./Disciplina');
const DisciplinaCurso = require('./DisciplinaCurso');
const DisciplinaPessoa = require('./DisciplinaPessoa');
const Pessoa = require('./Pessoa');
const Usuario = require('./Usuario');
const Cargo = require('./Cargo');
const Hierarquia = require('./Hierarquia');

// Curso ↔ Disciplina
Curso.belongsToMany(Disciplina, {
  through: DisciplinaCurso,
  as: 'disciplinas',
  foreignKey: 'curso_id',
  otherKey: 'disciplina_id'
});

Disciplina.belongsToMany(Curso, {
  through: DisciplinaCurso,
  as: 'cursos',
  foreignKey: 'disciplina_id',
  otherKey: 'curso_id'
});

Disciplina.belongsToMany(Pessoa, {
  through: DisciplinaPessoa,
  as: 'professores',
  foreignKey: 'disciplina_id',
  otherKey: 'pessoa_id'
});

Pessoa.belongsToMany(Disciplina, {
  through: DisciplinaPessoa,
  as: 'disciplinas',
  foreignKey: 'pessoa_id',
  otherKey: 'disciplina_id'
});

// Pessoa ↔ Cargo
Pessoa.belongsTo(Cargo, {
  foreignKey: 'cargo_id',
  as: 'cargo'
});
Cargo.hasMany(Pessoa, {
  foreignKey: 'cargo_id',
  as: 'pessoas'
});

// Pessoa ↔ Usuario (1:1)
Pessoa.hasOne(Usuario, {
  foreignKey: 'pessoa_id',
  as: 'usuario'
});
Usuario.belongsTo(Pessoa, {
  foreignKey: 'pessoa_id',
  as: 'pessoa'
});

// Usuario ↔ Hierarquia
Usuario.belongsTo(Hierarquia, {
  foreignKey: 'hierarquia_id',
  as: 'hierarquia'
});
Hierarquia.hasMany(Usuario, {
  foreignKey: 'hierarquia_id',
  as: 'usuarios'
});

module.exports = {
    Curso,
    Disciplina,
    Pessoa,
    Usuario,
    Cargo,
    Hierarquia,
    DisciplinaCurso,
    DisciplinaPessoa
};

