const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Lga = require('./Lga');

const Srp = sequelize.define('Srp', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  lga_id: { type: DataTypes.INTEGER, allowNull: false },
  onset: DataTypes.STRING,
  season_end: DataTypes.STRING,
  season_length: DataTypes.INTEGER,
  annual_rainfall: DataTypes.INTEGER,
  year: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
  
}, {
  tableName: 'scp_trans_srp',
  timestamps: false
});

Srp.belongsTo(Lga, { foreignKey: 'lga_id', as: 'lga' });
Lga.hasMany(Srp, { foreignKey: 'lga_id', as: 'srp' });

module.exports = Srp;


// module.exports = (sequelize, DataTypes) => {
//     const Srp = sequelize.define('Srp', {
//       id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true
//       },
//       lga_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false
//       },
//       onset: DataTypes.STRING,
//       season_end: DataTypes.STRING,
//       season_length: DataTypes.INTEGER,
//       annual_rainfall: DataTypes.INTEGER
//     }, {
//       tableName: 'srp',
//       timestamps: false
//     });
  
//     Srp.associate = (models) => {
//       Srp.belongsTo(models.Lga, {
//         foreignKey: 'lga_id',
//         as: 'lga'
//       });
//     };
  
//     return Srp;
//   };
  

// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/database');
// const Lga = require('./Lga');

// const Srp = sequelize.define('srp', {
//     id:{
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true
//     },  
//     lga_id: {
//     type: DataTypes.INTEGER,
//     allowNull: false
//     },
//     onset: DataTypes.STRING,
//     season_end: DataTypes.STRING,
//     season_length: DataTypes.INTEGER,
//     annual_rainfall: DataTypes.INTEGER,
//    // year:DataTypes.INTEGER 
// }, {
//   tableName: 'srp',
//   timestamps: false
// });

// Srp.associate = (models) => {
//     Srp.belongsTo(models.Lga, {
//         foreignKey: 'lga_id',
//         as: 'lga'
//     });
// };


// module.exports = Srp;