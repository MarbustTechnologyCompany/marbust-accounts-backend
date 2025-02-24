const { DataTypes } = require('sequelize');
const sequelize = require('../../../util/database.util');

const MBRelaxCustomers = sequelize.define('MBRelaxCustomers', {
  id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
  },
  nombres: {
      type: DataTypes.STRING,
      allowNull: false
  },
  cedula: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  direccion: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  sector: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  idCiudad: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  referencia: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'MBRelaxCustomers',
});

module.exports = MBRelaxCustomers;