var express = require('express');
var router = express.Router();
var fs=require('fs');
var jigtype1=require('../config/jigtype1.json');
/* GET home page. */
router.all('/', function(req, res, next)
{
    var response1={};
    var testcases=jigtype1.testcases;
    console.log(testcases);
    var check="good";
    var response = req.body.inputJsonStr;
    var jsonResponse=JSON.parse(response);
    var current_TC=jsonResponse.testcase_id;
    console.log(current_TC);
    console.log(testcases[1].test);
    console.log(testcases[1].TCID);

    for(i=0;i<testcases.length;i++)
    {
        if(testcases[i].TCID==current_TC)
        {
            if(testcases[i].test==check)
            {
                var status="success";
            }
            else
            {
                var status="failed";
            }
        }
    }
    response1={status:status};
    res.send(response1);
    //res.render('index', { title: 'Express' });
});
module.exports = router;
