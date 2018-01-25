var express = require('express');
var router = express.Router();
var fs=require('fs');
//var TestResultDetails=require('../TestResultDetails..json');
/* GET home page. */
router.post('/', function(req, res, next)
{
    var TestResultDetails = req.body.inputJsonStr;
    // var TestResultDetails=JSON.parse(response);
    // res.send(TestResultDetails);
    console.log(TestResultDetails);
    //res.render('index', { title: 'Express' });
    fs.writeFile('TestResultDetails.json', TestResultDetails, function (err) {
        if (err) throw err;
        var response={"status":"Uploaded Succesfully"};
        console.log(response);
        res.send(response);
    });
});
module.exports = router;