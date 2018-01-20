var express = require('express');
var router = express.Router();
var fs=require('fs');
var jigtype1=require('../config/jigtype1.json');
/* GET home page. */
router.all('/', function(req, res, next)
{
    var testcases=jigtype1.testcases;
    console.log(testcases);
    var response = req.body.inputJsonStr;
    var jsonResponse=JSON.parse(response);
    var current_TC=jsonResponse.testcase_id;
    console.log(current_TC);
    for(i=0;i<testcases.length;i++)
    {
        if(testcases[i].TCID==current_TC)
        {
            var nextTestcase=testcases[i+1].TCID;
        }
    }
    var response={nexttestcase:nextTestcase};
    res.send(response);
    //res.render('index', { title: 'Express' });
});
module.exports = router;
