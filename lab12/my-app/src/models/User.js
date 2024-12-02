const { DataTypes } = require('sequelize');
const sequelize = require('../db.js');


const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
},
}, {
  timestamps: false,
});


module.exports = User;