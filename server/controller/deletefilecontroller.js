const express = require('express');
var router = express.Router();
const fs = require('fs');
var path = require('path');

/**
 * Function that delete JSON file
 * @param {*} dirname 
 * @param {*} filename 
 * @param {*} parseData 
 */

router.post('/', (req, res) => {
    let fileName = req.body.filename;
    let folderName = req.body.foldername;
    fs.unlink(`../outputjson/${folderName}/${fileName}`, (err) => {
        if (err) {
          throw err;
        }
        res.type('json').status(200).send({message3: 'File has been deleted sucessfully.', type: 'Sucess'});
        //file removed
      })
});

module.exports = router;