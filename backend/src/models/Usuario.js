const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Pessoa = require('./Pessoa');
const Hierarquia = require('./Hierarquia');

const Usuario = sequelize.define('Tb_Usuario', {
  login: {
    type: DataTypes.STRING,
    unique: true
  },
  senha: DataTypes.STRING
}, {
  tableName: 'Tb_Usuario'
});

Usuario.belongsTo(Pessoa, { foreignKey: 'pessoa_id' });
Usuario.belongsTo(Hierarquia, { foreignKey: 'hierarquia_id' });

module.exports = Usuario;
