const { DataTypes } = require('sequelize');
const sequelize = require('../../../../util/database.util');

const Types = sequelize.define('MarbustEducationEnglishVerbsTypes', {
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
  tableName: 'MarbustEducationEnglishVerbsTypes',
  hooks: {
    afterSync: async (options) => {
      const count = await Types.count();
      if (count === 0) {
        await Types.bulkCreate([
          { id: 1, name: 'Regular' },
          { id: 2, name: 'Irregular' },
        ]);
      }
    }
  }
});

module.exports = Types;