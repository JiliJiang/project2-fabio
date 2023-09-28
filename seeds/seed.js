const sequelize = require('../config/connection');

const user = require('../models/User');//database



const userData = require('./userSeed.json');//data seeds


const Exp = require('../models/expense');//database
const expData = require('./expenseSeed.json');//data seeds


const seedDatabase = async () => {

  await sequelize.sync({ force: true });
//user data seeding
await user.bulkCreate(userData, {
  individualHooks: true,
  returning: true,
});

  
//expense data seeding
  await Exp.bulkCreate(expData, {
    individualHooks: true,
    returning: true,
  });
  process.exit(0);
  
};

seedDatabase ();


