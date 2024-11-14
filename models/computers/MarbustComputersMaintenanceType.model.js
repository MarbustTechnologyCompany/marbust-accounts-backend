const { DataTypes } = require('sequelize');
const sequelize = require('../../util/database.util');

const MarbustComputersMaintenanceType = sequelize.define('MarbustComputersMaintenanceType', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
    tableName: 'MarbustComputersMaintenanceTypes',
    hooks: {
      afterSync: async (options) => {
        const count = await MarbustComputersMaintenanceType.count();
        if (count === 0) {
          await MarbustComputersMaintenanceType.bulkCreate([
            { name: 'Starter' },
            { name: 'Basic' },
            { name: 'Pro' },
            { name: 'Premium' }
          ]);
        }
      }
    }
  });
module.exports = MarbustComputersMaintenanceType;