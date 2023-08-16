const fs = require('fs');

function getExpensesAmounts(req, res) {
    const expensesHistoryFile = '../server/expensesHistory.json';

    fs.readFile(expensesHistoryFile, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Server error' });
        } else {
            const jsonData = JSON.parse(data);
            let amountsObj = {
                clothes: 0,
                household: 0,
                gadgets: 0,
                food: 0,
                entertainment: 0,
                other: 0
            };

            let yearsAll = jsonData.map(elem => {
               return (new Date(elem.date)).getFullYear();
            });

            let years = [...new Set(yearsAll)]
            
            jsonData.forEach(element => {
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

            let amountsArray = [];
            for (let key in amountsObj) {
                amountsArray.push(amountsObj[key]);
            }
            res.json([amountsArray, years]);
        }
    });
}

module.exports = getExpensesAmounts;