const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Cargo = require('./Cargo');

const Pessoa = sequelize.define('Tb_Pessoa', {
  nome: DataTypes.STRING,
  email: {
    type: DataTypes.STRING,
    unique: true
  },
  matricula: DataTypes.STRING
}, {
  tableName: 'Tb_Pessoa'
});

Pessoa.belongsTo(Cargo, { foreignKey: 'cargo_id' });

module.exports = Pessoa;