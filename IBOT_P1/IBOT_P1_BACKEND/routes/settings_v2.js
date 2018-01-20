var express = require('express');
var router = express.Router();
var fs=require('fs');
var path = require('path');
router.all('/', function(req, res, next)
{
    fs.stat('./config/TestJig.json', function(err, stat) {
        if(err == null) {
            console.log("exists");
            var TestJig=require('../config/TestJig.json');
            var testcases=require('../config/testcases.json');
            var response={"status":"success",testjig:TestJig.testjigname,testcases:testcases};
            //console.log(totalcases);
            res.send(response);
        }
        else if(err.code == 'ENOENT') {
            console.log("no exists");
            var response={"status":"error","error":"test jig not selected"};
            res.send(response);
        }
    });
    //res.render('index', { title: 'Express' });
});
module.exports = router;
