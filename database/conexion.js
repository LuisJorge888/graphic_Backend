const { Sequelize } = require('sequelize');

const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PWD, {
  host: process.env.DB_HOTS,
  dialect: "mariadb"
});

async function testConection(){
  try {
    await db.authenticate();
    console.log('Connection has been established successfully.');
    db.g
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

module.exports = {
  testConection,
  db
}