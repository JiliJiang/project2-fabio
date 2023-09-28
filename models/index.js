
const Expense = require('./expense');
const User = require('./User');

// Define a Driver as having many Cars, thus creating a foreign key in the `car` table
User.hasMany(Expense, {
    foreignKey: 'user_id',
  });
  
  // The association can also be created from the Car side
  Expense.belongsTo(User, {
    foreignKey: 'user_id',
  });
  
  module.exports = { User, Expense };
  



