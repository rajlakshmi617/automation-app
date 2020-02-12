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
                    const testFolder = '../outputjson/';
                    fs.readdir(testFolder, (err, folders) => {
                        folders.map(folder => {
                            fs.readdir('../outputjson/'+folder,(err, files)=>{
                                files.map((file) => {
                                    fileList.push(file);
                                    const relativePath = path.dirname(`../outputjson/${dirname}/${file}`);
                                    fileObj[file] = {filename: file, path: relativePath};
                                    dataObject.push(fileObj[file]);                        
                                })
                            } )
                        });
                        res.setTimeout(3000, function(){
                            res.type('json').status(200).send({message: 'File created sucessfully', fileObject: dataObject, type: 'Sucess'})
                            return;
                        });
                    });
                }
            });
        }else{
            fs.mkdir(`../outputjson/${dirname}`, function(err){
                if(err){
                    // console.log('failed to create directory');
                    return console.error(err);
                }else{
                    // res.send('Directory created successfully');
                    fs.exists(`../outputjson/${dirname}/${filename}.json`, function(fileexists) {
                        if(fileexists){
                            // res.send('File already exists');      
                            res.status(200).send({message: 'File already exists', type: 'Warning'});               
                        } else {
                            writeFile(dirname, filename, parseData);
                            // res.send('File created sucessfully');     
                            const testFolder = '../outputjson/';
                            fs.readdir(testFolder, (err, folders) => {
                                folders.map(folder => {
                                    fs.readdir('../outputjson/'+folder,(err, files)=>{
                                        files.map((file) => {
                                            fileList.push(file);
                                            const relativePath = path.dirname(`../outputjson/${dirname}/${file}`);
                                            fileObj[file] = {filename: file, path: relativePath};
                                            dataObject.push(fileObj[file]);                        
                                        })
                                        console.log('fileObj', fileObj);

                                    } )
                                });
                                res.setTimeout(3000, function(){
                                    console.log('Request has timed out.');
                                    res.type('json').status(200).send({message: 'File created sucessfully', message2: 'Directory created successfully', fileObject: dataObject, type: 'Sucess'})
                                    return;
                                });
                            });
                        }
                    });
                }
            });
            
        }
    });
});

module.exports = router;