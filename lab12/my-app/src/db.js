const { Sequelize } = require('sequelize');


const sequelize = new Sequelize('users', 'root', 'i$v-dL2TSVbqsI8', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;