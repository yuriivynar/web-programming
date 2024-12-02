const sequelize = require('./db.js');


const initDb = async () => {
  try {
    await sequelize.sync({ force: false }); 
    console.log('Database synchronized');
  } catch (error) {
    console.error('Unable to synchronize the database:', error);
  }
};

module.exports = initDb;