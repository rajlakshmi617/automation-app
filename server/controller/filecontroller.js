const express = require('express');
var router = express.Router();
const fs = require('fs');

/**
 * Function that write JSON to a JSON file
 * @param {*} dirname 
 * @param {*} filename 
 * @param {*} parseData 
 */
function writeFile(dirname, filename, parseData){
    fs.writeFileSync(`../outputjson/${dirname}/${filename}.json`, JSON.stringify(parseData), (err) => {
        if (err){
            res.send(err);
        }
        res.send(filename);
        res.send('file generated successfully');
    });
}
function readDirectory(){
    const testFolder = '../outputjson/test/';
    fs.readdir(testFolder, (err, files) => {
        files.forEach(file => {
        // console.log('filename-->', file);
        });
    });
}
router.post('/', (req, res) => {
    let data = JSON.stringify(req.body.jsonData);
    let parseData = JSON.parse(data);
    let dirname = req.body.dirName;
    let filename = req.body.fileName;
    fs.exists(`../outputjson/${dirname}`, function(exists) {
        // console.log("folder exists ? " + exists);
        if(exists){
            fs.exists(`../outputjson/${dirname}/${filename}.json`, function(fileexists) {
                console.log("file exists ? " + fileexists);
                if(fileexists){
                    res.send('File already exists'); 
                    // res.status(403).send('Forbidden');               
                } else {
                    writeFile(dirname, filename, parseData);
                    res.send('File created sucessfully');    
                    res.sendStatus(200);                   
                    readDirectory();
                }
            });
        }else{
            fs.mkdir(`../outputjson/${dirname}`, function(err){
                if(err){
                    // console.log('failed to create directory');
                    return console.error(err);
                }else{
                    res.send('Directory created successfully');
                    fs.exists(`../outputjson/${dirname}/${filename}.json`, function(fileexists) {
                        if(fileexists){
                            res.send('File already exists');         
                            // res.sendStatus(409);                   
                        } else {
                            writeFile(dirname, filename, parseData);
                            res.send('File created sucessfully');     
                            res.sendStatus(200);                   
                            readDirectory();
                        }
                    });
                }
            });
            
        }
    });
});

module.exports = router;