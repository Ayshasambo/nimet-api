const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const State = require('./State');

const Lga = sequelize.define('Lga', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  state_id: { type: DataTypes.INTEGER, allowNull: false }
},
  {
    tableName: 'scp_static_lga',
    timestamps: false
  }
);

Lga.belongsTo(State, { foreignKey: 'state_id', as: 'state' });
State.hasMany(Lga, { foreignKey: 'state_id', as: 'lga' });

module.exports = Lga;


