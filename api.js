const express = require('express');
const bodyParser = require('body-parser');
require('./connectDB');
require('dotenv').config();
const service = require('./service');

var app = express();
const router = express.Router();
router.use(bodyParser.json())

// works
router.get('/test', (req, res) => {
    res.json({ "message": "Test route works !!" });
});

// works
router.post('/writeNewFile', (req, res) => {
    const responseObject = service.writeNewFile(req.body);
    res.json(responseObject);
});

// works
router.get('/getFileDetails', async (req, res) => {
    const responseObject = await service.getFileDetails(req.body);
    let output = {};
    output.content = Buffer.from(responseObject.data.content, 'base64').toString('ascii');
    output.sha = responseObject.data.sha;
    if (responseObject.status === 200 && responseObject.statusText === 'OK') {
        res.json(output);
    } else {
        console.log(responseObject);
    }
});

app.use('/', router);
app.listen(process.env.PORT, () => {
    console.log("Server is listening on port " + process.env.PORT);
});