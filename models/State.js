const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');



const State = sequelize.define('State', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false }
},
{
    tableName: 'scp_static_state', // match your actual DB table
    timestamps: false
  }
);



// State.associate = (models) => {
//     State.hasMany(models.Lga, {
//         foreignKey: 'state_id',
//         as: 'lga'
//     });
// };

module.exports = State;


// module.exports = (sequelize, DataTypes) => {
//     const State = sequelize.define('State', {
//         id: {
//             type: DataTypes.INTEGER,
//             primaryKey: true,
//             autoIncrement: true
//         },
//         statename: {
//         type: DataTypes.STRING,
//         allowNull: false
//       }
//     });
  
//     State.associate = (models) => {
//       State.hasMany(models.Lga, {
//         foreignKey: 'state_id',
//         as: 'lga'
//       });
//     };
  
//     return State;
//   };