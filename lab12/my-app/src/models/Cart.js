const { DataTypes } = require('sequelize');
const sequelize = require('../db.js');
const User = require('./User.js');


const Cart = sequelize.define('Cart', {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  items: {
    type: DataTypes.JSON,
    allowNull: false
},
}, {
  timestamps: false,
});


module.exports = Cart;