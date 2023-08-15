const Router = require('express').Router;
const getCalculations = require('../controllers/getCalculations')
const saveExpense = require('../controllers/saveExpense');
const saveIncome = require('../controllers/saveIncome')
const getExpensesHistory = require('../controllers/getExspensesHistory')
const getExpensesAmounts = require('../controllers/getExpensesAmounts');
const saveData = require('../controllers/saveDate');

const router = new Router();

router.get('/calculations', getCalculations);

router.post('/add-expense', saveExpense);

router.post('/add-income', saveIncome);

router.get('/history', getExpensesHistory);

router.get('/analysis', getExpensesAmounts);
router.post('/analysis-new', saveData);


module.exports = router;