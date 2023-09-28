const express = require('express');
const { Expense } = require('../../models');
const withauth = require('../../utils/auth');
const { uuid: v4 } = require('uuid');


//const bodyParser = require('body-parser');
const router = express.Router();

// In-memory storage for transactions (Replace with a database in production)
let transactions = [];
let transactionIdCounter = 1;

//router.use(bodyParser.urlencoded({ extended: true }));
//router.use(bodyParser.json());


// API endpoint to get transactions
router.get('/', async (req, res) => {
    try {
        const transaction = await Expense.findAll({
            // where: {
            // user_id: req.session.user_id,
            // }
        })
        const transactions = transaction.map(item => item.get({ plain: true }))
        res.json(transactions)

    } catch (error) {
        console.log(error.name, error.message)
        res.status(500).json(error)
    }
});


// router.get('/transaction/:month', withauth, async (req, res) => {
//     try {

//         const transaction = await Expense.findOne({
//             where: {
//                 user_id: req.session.user_id,
//                 month: req.params.month,
//             }
//         })
//         const transactions = transaction//.map(item => item.get({plain:true}))
//         res.json(transactions)
//     } catch (error) {
//         console.log(error.name, error.message)
//         res.status(500).json(error)
//     }
// })

// API endpoint to add a new transaction
router.post('/', (req, res) => {

    console.log(req.body)
    const incomeExpense = req.body.type=="Income"? req.body.amount : 0;
    const expenseExpense = req.body.type=="Expense"? req.body.amount : 0;

    Expense.create({
        income:incomeExpense,
        expense: expenseExpense,
        month: req.body.month,
    })
    .then( newExpense =>
        {console.log(newExpense) 
        res.json(newExpense)}
        )
    .catch(err => 
    {console.log(err)
    res.status(500).json(err)}
        );

});




// API endpoint to delete a transaction by ID
// router.delete('/transactions/:id', (req, res) => {
//     const transactionId = parseInt(req.params.id, 10);
//     const index = transactions.findIndex(transaction => transaction.id === transactionId);
//     if (index !== -1) {
//         const deletedTransaction = transactions.splice(index, 1)[0];
//         res.json(deletedTransaction);
//     } else {
//         res.status(404).json({ error: 'Transaction not found' });
//     }
// });

module.exports = router;
