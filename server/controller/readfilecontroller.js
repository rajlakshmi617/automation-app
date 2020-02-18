const express = require('express');
var router = express.Router();
const fs = require('fs');
var path = require('path');

/**
 * Function that write JSON to a JSON file
 * @param {*} dirname 
 * @param {*} filename 
 * @param {*} parseData 
 */

router.post('/', (req, res) => {
    let fileName = req.body.filename;
    let folderName = req.body.foldername;
    fs.readFile(`../outputjson/${folderName}/${fileName}`, function(err, data) {
        if(err){
            throw err;
        }
        res.writeHead(200, {'Content-Type': 'application/JSON'});
        res.write(data);
        res.end();
    });
});

module.exports = router;