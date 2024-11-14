const { DataTypes } = require('sequelize');
const sequelize = require('../../util/database.util');
const MAINTENANCE_TYPE = require('../../enums/computers/maintenanceType.enum');
const User = require('../user.model');
const Computer = require('./MarbustComputersComputer.model');
const MaintenanceType = require('./MarbustComputersMaintenanceType.model');

const MarbustComputersMaintenance = sequelize.define('MarbustComputersMaintenance', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nextMaintenance: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  reportedBy: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  computerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Computer,
      key: 'id'
    }
  },
  maintenanceTypeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: MaintenanceType,
      key: 'id'
    },
    defaultValue: MAINTENANCE_TYPE.BASIC
  },
  reportedDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
}, {
  tableName: 'MarbustComputersMaintenances',
});

MarbustComputersMaintenance.belongsTo(User, { foreignKey: 'reportedBy' });
MarbustComputersMaintenance.belongsTo(Computer, { foreignKey: 'computerId' });
MarbustComputersMaintenance.belongsTo(MaintenanceType, { foreignKey: 'maintenanceTypeId' });

module.exports = MarbustComputersMaintenance;