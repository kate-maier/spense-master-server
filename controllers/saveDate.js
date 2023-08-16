const fs = require('fs');

function saveExpense(req, res) {
    const expensesHistoryFile = '../server/expensesHistory.json';

    fs.readFile(expensesHistoryFile, 'utf-8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Server error' });
        } else {
            const jsonData = JSON.parse(data);

            let reqDate = req.body;

            let months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
            let month = months.indexOf(reqDate.month);

            let filteredExpenses = jsonData.filter(elem => {
                return (((new Date(elem.date).getFullYear()) == reqDate.year) && ((new Date(elem.date).getMonth() == month)));
            })

            let amountsObj = {
                clothes: 0,
                household: 0,
                gadgets: 0,
                food: 0,
                entertainment: 0,
                other: 0
            };

            filteredExpenses.forEach(element => {
                let amount = Number(element.amount);
                switch (element.category) {
                    case 'одяг':
                        amountsObj.clothes += amount;
                        break;
                    case 'побут':
                        amountsObj.household += amount;
                        break;
                    case 'гаджети':
                        amountsObj.gadgets += amount;
                        break;
                    case 'їжа':
                        amountsObj.food += amount;
                        break;
                    case 'розваги':
                        amountsObj.entertainment += amount;
                        break;
                    case 'інше':
                        amountsObj.other += amount;
                        break;
                }
            });

            let processedData = [];
            for (let key in amountsObj) {
                processedData.push(amountsObj[key]);
            }
            
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(processedData);
        }
    })
}

module.exports = saveExpense;