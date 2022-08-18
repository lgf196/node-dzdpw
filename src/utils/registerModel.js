const { sequelize } = require('../config/orm.js');

export const registerModel = (tableName, modelName, fields) => {
  const model = sequelize.define(
    modelName,
    {
      ...fields,
    },
    {
      tableName: tableName,
      timestamps: false,
    },
  );
  return model;
};

/**
 *
 * const fields = [{
    fieldName: {
        field: 'field_name',
        type: DataTypes.TEXT,
        allowNull: false
    },
}]
const newModel = registerModel('some_table', 'someModel', fields);
  const items = await newModel.findAll({
    where: {
      // some conditions
    }
  })

 */
