const express = require('express');
const cors = require('cors');
const router = require('./router/index');


const app = express();
const port = 5000;

app.use(express.json());
app.use(cors({
    'Access-Control-Allow-Origin': '*'
}));
app.use('/api', router);


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})