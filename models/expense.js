  const { Model, DataTypes } = require('sequelize');
  const sequelize = require('../config/connection');

  class Expense extends Model {}

  Expense.init(
    {
      eid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      income:{
        type: DataTypes.INTEGER,
      },
      expense:
      {
        type: DataTypes.INTEGER,
      },
      month: {
        type: DataTypes.STRING,
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'uid'
        }
      }
    },
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'expense',
    }
  );

  module.exports = Expense;
