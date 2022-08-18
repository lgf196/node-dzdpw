const { sequelize } = require('../config/orm.js');
const { DataTypes } = require('sequelize');
const User_login = sequelize.define('user_login', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  title: DataTypes.STRING,
  des: DataTypes.STRING,
});
module.exports = User_login;
