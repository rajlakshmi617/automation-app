const express = require('express');
var router = express.Router();
// console.log('file controller');
router.post('/', (req, res) => {
    // console.log('inside file controller');
    let student = { 
        name: 'Mike',
        age: 23, 
        gender: 'Male',
        department: 'English',
        car: 'Honda' 
    };
    let data = JSON.stringify(student);
    fs.writeFile('../outputjson/student-4.json', data, (err) => {
        if (err) throw err;
        console.log('Data written to file');
    });
    
});

module.exports = router;