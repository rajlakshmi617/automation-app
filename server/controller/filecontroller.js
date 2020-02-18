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
function writeFile(dirname, filename, parseData){
    fs.writeFileSync(`../outputjson/${dirname}/${filename}.json`, parseData, (err) => {
        if (err){
            res.send(err);
        }
        res.send(filename);
        res.send('file generated successfully');
    });
}
router.post('/', (req, res) => {
    let data = JSON.stringify(req.body.jsonData);
    let parseData = JSON.parse(data);
    let dirname = req.body.dirName;
    let filename = req.body.fileName;
    let fileList= [];
    let dataObject = [];
    let fileObj = {}
    fs.exists(`../outputjson/${dirname}`, function(exists) {
        if(exists){
            fs.exists(`../outputjson/${dirname}/${filename}.json`, function(fileexists) {
                if(fileexists){
                    res.status(200).send({message: 'File already exists', type: 'Warning'});               
                } else {
                    writeFile(dirname, filename, parseData);
                    res.type('json').status(200).send({message: 'File created sucessfully', type: 'Sucess'})
                }
            });
        }else{
            fs.mkdir(`../outputjson/${dirname}`, function(err){
                if(err){
                    // console.log('failed to create directory');
                    return console.error(err);
                }else{
                    fs.exists(`../outputjson/${dirname}/${filename}.json`, function(fileexists) {
                        if(fileexists){
                            res.status(200).send({message: 'File already exists', type: 'Warning'});               
                        } else {
                            writeFile(dirname, filename, parseData);
                            res.type('json').status(200).send({message: 'File created sucessfully', message2: 'Directory created successfully', type: 'Sucess'})
                        }
                    });
                }
            });
            
        }
    });
});


module.exports = router;