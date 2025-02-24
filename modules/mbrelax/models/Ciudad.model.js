const { DataTypes } = require('sequelize');
const sequelize = require('../../../util/database.util');
const MBRelaxProvincias = require('./Provincia.model'); // Importar el modelo de Provincia

const MBRelaxCiudades = sequelize.define('MBRelaxCiudades', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  provinciaId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: MBRelaxProvincias,
      key: 'id'
    }
  },
}, {
  tableName: 'MBRelaxCiudades',
  hooks: {
    afterSync: async (options) => {
      const count = await MBRelaxCiudades.count();
      if (count === 0) {
        await MBRelaxCiudades.bulkCreate([
          { name: 'Santo Domingo de Los Colorados', provinciaId: 23 },
          { name: 'La Concordia', provinciaId: 23 },
          { name: 'Quito', provinciaId: 17 },
          { name: 'Portoviejo', provinciaId: 13 }
        ]);
      }
    }
  }
});


MBRelaxCiudades.belongsTo(MBRelaxProvincias, { foreignKey: 'provinciaId' });
MBRelaxProvincias.hasMany(MBRelaxCiudades, { foreignKey: 'provinciaId' });

module.exports = MBRelaxCiudades;