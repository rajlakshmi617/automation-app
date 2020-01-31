const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

var fileController = require('../server/controller/filecontroller');

var app = express();
app.use(bodyParser.json());
app.use(cors({origin:'http://127.0.0.1:8080' }))
app.listen(3000, () => console.log('Server started at port : 3000'))
app.use('/generate', function(req,res){
    // console.log('dddd');
    res.json({'eee':'dd'})
});
// let student = { 
//     name: 'Mike',
//     age: 23, 
//     gender: 'Male',
//     department: 'English',
//     car: 'Honda' 
// };
// let data = JSON.stringify(student);
// fs.writeFile('../outputjson/student-3.json', data, (err) => {
//     if (err) throw err;
//     console.log('Data written to file');
// });
