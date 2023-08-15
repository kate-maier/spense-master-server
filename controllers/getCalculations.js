const fs = require('fs');

let expensesSum = 0;
let monthExpenses = 0;
let incomesSum = 0;
let monthIncomes = 0;

fs.readFile('../server/expensesHistory.json', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    } else {
        const jsonData = JSON.parse(data);

        expensesSum = jsonData.reduce((sum, elem) => {
            return sum += Number(elem.amount);
        }, 0);

        monthExpenses = jsonData.reduce((sum, elem) => {
            if ((new Date(elem.date).getMonth()) === (new Date()).getMonth()) {
                sum += Number(elem.amount);
            }
            return sum;
        }, 0);
    }
});


fs.readFile('../server/incomesHistory.json', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    } else {
        const jsonData = JSON.parse(data);

        incomesSum = jsonData.reduce((sum, elem) => {
            return sum += Number(elem.amount);
        }, 0);

        monthIncomes = jsonData.reduce((sum, elem) => {
            if ((new Date(elem.date).getMonth()) === (new Date()).getMonth()) {
                sum += Number(elem.amount);
            }
            return sum;
        }, 0);
    }
});

function getCalculations(req, res) {
    let balanceMoney = incomesSum - expensesSum;
    let result = { balanceMoney: balanceMoney, monthExpenses: monthExpenses, monthIncomes: monthIncomes }

    res.json(result);
}

module.exports = getCalculations;