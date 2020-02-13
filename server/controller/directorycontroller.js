const express = require('express');
var router = express.Router();
const fs = require('fs');
var path = require('path');

router.get('/', (req, res) => {
    let fileList= [];
    let dataObject = [];
    let fileObj = {}
    const testFolder = '../outputjson/';
    fs.readdir(testFolder, (err, folders) => {
        folders.map(folder => {
            fs.readdir('../outputjson/'+folder,(err, files)=>{
                // console.log('folder', folder);
                files.map((file) => {
                    fileList.push(file);
                    const relativePath = path.dirname(`../outputjson/${folder}/${file}`);
                    fileObj[file] = {filename: file, foldername: folder, filepath: `${relativePath}/${file}`};
                    dataObject.push(fileObj[file]);                        
                })
                // console.log('fileObj', fileObj);
            } )
        });
        res.setTimeout(2000, function(){
            res.type('json').status(200).send({message: 'File read sucessfully', fileObject: dataObject, type: 'Sucess'})
            return;
        });
    });
});

module.exports = router;