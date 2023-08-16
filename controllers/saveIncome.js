const fs = require('fs');


function saveIncome(req, res){
    const incomesHistoryFile = '../server/incomesHistory.json';

    fs.readFile(incomesHistoryFile, 'utf-8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Server error' });
        } else {
            const jsonData = JSON.parse(data);

            const incomesInfo = { id: jsonData.length + 1, amount: req.body.amount, date: new Date() }
            jsonData.push(incomesInfo);

            const updatedData = JSON.stringify(jsonData, null, 2);

            fs.writeFile(incomesHistoryFile, updatedData, 'utf8', (err) => {
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

module.exports = saveIncome;