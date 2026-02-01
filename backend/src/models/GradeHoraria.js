const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const GradeHoraria = sequelize.define(
  'Tb_Grade_Horaria',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },

    curso_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    coordenador_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    disciplina_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },

    horario_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    dia_semana_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    ano_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    semestre_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    curriculo_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    professor_id: {
    type: DataTypes.INTEGER,
    allowNull: true
    }

  },
  {
    tableName: 'Tb_Grade_Horaria',
    timestamps: true,
    indexes: [
    {
        name: 'uk_grade_slot',
        unique: true,
        fields: [
        'curso_id',
        'ano_id',
        'semestre_id',
        'curriculo_id',
        'horario_id',
        'dia_semana_id',
        'professor_id'
        ]
    }
    ]

  }
);

module.exports = GradeHoraria;
