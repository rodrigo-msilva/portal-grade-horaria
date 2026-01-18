const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Cargo = require('./Cargo');
const Usuario = require('./Usuario');
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




module.exports = Pessoa;