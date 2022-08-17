const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('dzdpw', 'root', '123456', {
  host: 'localhost',
  dialect: 'mysql',
  define: {
    freezeTableName: true,
  },
});

const detectConnection = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

(async () => {
  detectConnection();
})();

exports.detectConnection = detectConnection;

exports.sequelize = sequelize;
