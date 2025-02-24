const { DataTypes } = require('sequelize');
const sequelize = require('../../../util/database.util');

const MBRelaxProvincias = sequelize.define('MBRelaxProvincias', {
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
}, {
  tableName: 'MBRelaxProvincias',
  hooks: {
    afterSync: async (options) => {
      const count = await MBRelaxProvincias.count();
      if (count === 0) {
        await MBRelaxProvincias.bulkCreate([
          { id: 1, name: 'Azuay' },
          { id: 2, name: 'Bolivar' },
          { id: 3, name: 'Cañar' },
          { id: 4, name: 'Carchi' },
          { id: 5, name: 'Cotopaxi' },
          { id: 6, name: 'Chimborazo' },
          { id: 7, name: 'El Oro' },
          { id: 8, name: 'Esmeraldas' },
          { id: 9, name: 'Guayas' },
          { id: 10, name: 'Imbabura' },
          { id: 11, name: 'Loja' },
          { id: 12, name: 'Los Rios' },
          { id: 13, name: 'Manabi' },
          { id: 14, name: 'Morona Santiago' },
          { id: 15, name: 'Napo' },
          { id: 16, name: 'Pastaza' },
          { id: 17, name: 'Pichincha' },
          { id: 18, name: 'Tungurahua' },
          { id: 19, name: 'Zamora Chinchipe' },
          { id: 20, name: 'Galapagos' },
          { id: 21, name: 'Sucumbios' },
          { id: 22, name: 'Orellana' },
          { id: 23, name: 'Santo Domingo de los Tsachilas' },
          { id: 24, name: 'Santa Elena' }
        ]);
      }
    }
  }
});

module.exports = MBRelaxProvincias;