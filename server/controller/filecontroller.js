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
    fs.exists(`../outputjson/${dirname}`, function(exists) {
        // console.log("folder exists ? " + exists);
        if(exists){
            fs.exists(`../outputjson/${dirname}/${filename}.json`, function(fileexists) {
                console.log("file exists ? " + fileexists);
                if(fileexists){
                    res.send('File already exists');                    
                } else {
                    writeFile(dirname, filename, parseData);
                }
            });
        }else{
            fs.mkdir(`../outputjson/${dirname}`, function(err){
                if(err){
                    // console.log('failed to create directory');
                    return console.error(err);
                }else{
                    // console.log('Directory created successfully');
                    res.send('Directory created successfully');
                    fs.exists(`../outputjson/${dirname}/${filename}.json`, function(fileexists) {
                        // console.log("file exists ? " + fileexists);
                        if(fileexists){
                            res.send('File already exists');                    
                        } else {
                            writeFile(dirname, filename, parseData);
                        }
                    });
                }
            });
            
        }
    });
});

module.exports = router;