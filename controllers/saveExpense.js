const fs = require('fs');

function saveExpense(req, res) {
    const expensesHistoryFile = '../server/expensesHistory.json';

    fs.readFile(expensesHistoryFile, 'utf-8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Server error' });
        } else {
            const jsonData = JSON.parse(data);

            let category;

            switch (req.body.category) {
                case 'clothes':
                    category = 'одяг';
                    break;
                case 'household':
                    category = 'побут';
                    break;
                case 'gadgets':
                    category = 'гаджети';
                    break;
                case 'food':
                    category = 'їжа';
                    break;
                case 'entertainment':
                    category = 'розваги';
                    break;
                case 'other':
                    category = 'інше';
                    break;
            }

            const expenseInfo = { id: jsonData.length + 1, category: category, amount: req.body.amount, date: new Date() }
            jsonData.push(expenseInfo);

            const updatedData = JSON.stringify(jsonData, null, 2);

            fs.writeFile(expensesHistoryFile, updatedData, 'utf8', (err) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({ error: 'Server error' });
                } else {
                    res.json({ message: 'Data added' })
                }
            })
        }
    })
}

module.exports = saveExpense;