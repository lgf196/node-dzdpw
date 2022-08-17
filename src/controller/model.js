const { sequelize } = require('../config/orm.js');

class ModelOption {
  constructor(model) {
    this.model = model;
  }
  find(callback) {
    this.model.findAll().then((list) => {
      callback && callback(list);
    });
  }
  add(values, callback, options) {
    this.model.create(values, options).then((list) => {
      callback && callback(list);
    });
  }
  delte() {}
  update() {}
}
exports.ModelOption = ModelOption;
