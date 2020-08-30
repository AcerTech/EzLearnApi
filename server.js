const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)
const express = require('express');
const config = require('config')
const app = express();
const bodyParser = require('body-parser');
const helmet = require("helmet");
var cors = require('cors')
app.use(cors())

app.use(helmet());
app.use(express.json())

port = process.env.PORT || 3000;
app.use('/api', require('./api'))

console.log(`app env: ${app.get('env')}`)
const db_url = config.get('database.dev_url')
console.log("Database url: " + db_url)
require('./startup/db')(db_url);



app.listen(port, () => {
    console.log('Running on port ' + port);
});

module.exports = app