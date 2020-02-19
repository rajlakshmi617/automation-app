const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

var fileController = require('../server/controller/filecontroller');
var DirectoryController = require('../server/controller/directorycontroller');
var readFileController = require('../server/controller/readfilecontroller');
var deleteFileController = require('../server/controller/deletefilecontroller');


var app = express();
app.use(bodyParser.json());
app.use(cors())
app.listen(3000, () => console.log('Server started at port : 3000'))
app.use('/generate', fileController);
app.use('/readdir', DirectoryController);
app.use('/read', readFileController);
app.use('/delete', deleteFileController);



