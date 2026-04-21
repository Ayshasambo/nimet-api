const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Lga = require('./Lga');

const Temperature = sequelize.define('Temperature', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  lga_id: { type: DataTypes.INTEGER, allowNull: false },
  year: DataTypes.INTEGER,
  month: DataTypes.STRING,
  day_temp: DataTypes.FLOAT,
  night_temp: DataTypes.FLOAT
}, {
  tableName: 'temperature',
  timestamps: false
});

Temperature.belongsTo(Lga, { foreignKey: 'lga_id', as: 'lga' });
Lga.hasMany(Temperature, { foreignKey: 'lga_id', as: 'temperature' });

module.exports = Temperature;
