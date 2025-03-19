const { DataTypes } = require('sequelize');
const sequelize = require('../../../../util/database.util');
const Types = require('./Types.model'); // Importar el modelo Types

const EnglishVerb = sequelize.define('MarbustEducationEnglishVerbs', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  type: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Types,
      key: 'id'
    }
  },
  spanish: {
    type: DataTypes.STRING,
    allowNull: false
  },
  present: {
    type: DataTypes.STRING,
    allowNull: false
  },
  pastTense: {
    type: DataTypes.STRING,
    allowNull: false
  },
  participle: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'MarbustEducationEnglishVerbs',
  hooks: {
    afterSync: async (options) => {
      const count = await EnglishVerb.count();
      if (count === 0) {
        await EnglishVerb.bulkCreate([
          { type: 1, spanish: 'abrir', present: 'open', pastTense: 'opened', participle: 'have opened' },
          { type: 1, spanish: 'amar', present: 'love', pastTense: 'loved', participle: 'has loved' },
          { type: 1, spanish: 'aprender', present: 'learn', pastTense: 'learned', participle: 'had learned' },
          { type: 1, spanish: 'apresurar', present: 'hurry', pastTense: 'hurried', participle: 'have hurried' },
          { type: 1, spanish: 'cambiar', present: 'change', pastTense: 'changed', participle: 'have changed' },
          { type: 1, spanish: 'creer', present: 'believe', pastTense: 'believed', participle: 'has believed' },
          { type: 1, spanish: 'cerrar', present: 'close', pastTense: 'closed', participle: 'had closed' },
          { type: 1, spanish: 'contestar', present: 'answer', pastTense: 'answered', participle: 'have answered' },
          { type: 1, spanish: 'continuar', present: 'continue', pastTense: 'continued', participle: 'has continued' },
          { type: 1, spanish: 'escuchar', present: 'listen', pastTense: 'listened', participle: 'had listened' },
          { type: 1, spanish: 'estudiar', present: 'study', pastTense: 'studied', participle: 'has studied' },
          { type: 1, spanish: 'explicar', present: 'explain', pastTense: 'explained', participle: 'has explained' },
          { type: 1, spanish: 'disfrutar', present: 'enjoy', pastTense: 'enjoyed', participle: 'had enjoyed' },
          { type: 1, spanish: 'imaginar', present: 'imagine', pastTense: 'imagined', participle: 'have imagined' },
          { type: 1, spanish: 'jugar', present: 'play', pastTense: 'played', participle: 'has played' },
          { type: 1, spanish: 'limpiar', present: 'clean', pastTense: 'cleaned', participle: 'had cleaned' },
          { type: 1, spanish: 'llegar', present: 'arrive', pastTense: 'arrived', participle: 'have arrived' },
          { type: 1, spanish: 'llover', present: 'rain', pastTense: 'rained', participle: 'has rained' },
          { type: 1, spanish: 'nombrar', present: 'name', pastTense: 'named', participle: 'have named' },
          { type: 1, spanish: 'permanecer', present: 'stay', pastTense: 'stayed', participle: 'has stayed' },
          { type: 1, spanish: 'pertenecer', present: 'belong', pastTense: 'belonged', participle: 'had belonged' },
          { type: 1, spanish: 'planear', present: 'plan', pastTense: 'planned', participle: 'have planned' },
          { type: 1, spanish: 'preparar', present: 'prepare', pastTense: 'prepared', participle: 'have prepared' },
          { type: 1, spanish: 'recibir', present: 'receive', pastTense: 'received', participle: 'had received' },
          { type: 1, spanish: 'recordar', present: 'remember', pastTense: 'remembered', participle: 'have remembered' },
          { type: 1, spanish: 'seguir', present: 'follow', pastTense: 'followed', participle: 'has followed' },
          { type: 1, spanish: 'tratar', present: 'try', pastTense: 'tried', participle: 'had tried' },
          { type: 1, spanish: 'usar', present: 'use', pastTense: 'used', participle: 'have used' },
          { type: 1, spanish: 'viajar', present: 'travel', pastTense: 'traveled', participle: 'has traveled' },
          { type: 1, spanish: 'vivir', present: 'live', pastTense: 'lived', participle: 'had lived' },
          { type: 1, spanish: 'virar, voltear', present: 'turn', pastTense: 'turned', participle: 'have turned' }
        ]);
      }
    }
  }
});

EnglishVerb.belongsTo(Types, { foreignKey: 'type' });
Types.hasMany(EnglishVerb, { foreignKey: 'type' });

module.exports = EnglishVerb;