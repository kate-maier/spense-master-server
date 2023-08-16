const fs = require('fs');
const changeDateFormat = require('./changeDateFormat')


function getExpensesHistory(req, res) {
    const expensesHistoryFile = '../server/expensesHistory.json';

    fs.readFile(expensesHistoryFile, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Server error' });
        } else {
            const jsonData = JSON.parse(data);
            let newJsonDate = jsonData.map(element => {
                element.date = changeDateFormat(new Date(element.date));
                return element;
            });
            res.json(newJsonDate);
        }
    });
}

module.exports = getExpensesHistory;