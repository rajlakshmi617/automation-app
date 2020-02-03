const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

var fileController = require('../server/controller/filecontroller');

var app = express();
app.use(bodyParser.json());
app.use(cors())
app.listen(3000, () => console.log('Server started at port : 3000'))
app.use('/generate', fileController);

