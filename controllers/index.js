const router = require('express').Router();
const apiRoutes = require('./api');

const sequelize = require('../config/connection');

router.use('/api', apiRoutes);


router.get('/', (req, res) => {
    res.render('home');
})


router.get('/register', (req, res) => {
    res.render('register');
})

router.get('/dashboard', (req, res) => {
    res.render('dashboard');
})





module.exports = router;