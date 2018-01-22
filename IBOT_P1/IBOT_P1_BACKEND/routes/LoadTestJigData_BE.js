var express = require('express');
var router = express.Router();
var fs=require('fs-extra');

var TestJigList=require('../TestJigList.json');
var TestJigData=require('../TestJigData.json');
var TestCaseData=require('../TestCaseData.json');
var TestJigType;
router.all('/', function(req, res, next)
{
    fs.stat('TestJigData.json', function(err, stat) {
        if(err == null) {
            var TestJigData=require('../TestJigData.json');
            console.log("Test jig exists load");
            var response=
                {
                    status:"success",
                    TestJigList:TestJigList,
                    TestJigData:TestJigData,
                    TestCaseData:TestCaseData
                };
            res.send(response);
        }
        else {
            console.log("not exists");
            var response={"status":"error","error":"test jig file not exists"};
            res.send(response);
        }
    });
    //res.render('index', { title: 'Express' });
});
router.all('/Reload_BE', function(req, res, next)
{
    var request=req.body.inputJsonStr;
    var jsonrequest=JSON.parse(request);
    TestJigType=jsonrequest.TestJigType;
    for(var i=0;i<TestJigList.TestJigList.length;i++) {
        if (TestJigType == TestJigList.TestJigList[i].DUT_ID) {
            var file1 = TestJigList.TestJigList[i].DESC_FILE;
            console.log(file1);
        }
    }
    fs.stat('TestJigData.json', function(err, stat) {
        if(err == null) {
            console.log("exists reload");
            for(var i=0;i<TestJigList.TestJigList.length;i++) {
                if (TestJigData.DUT_ID == TestJigList.TestJigList[i].DUT_ID) {
                    var file = TestJigList.TestJigList[i].DESC_FILE;
                    console.log(TestJigList.TestJigList[i].DESC_FILE);
                }
            }
            //fs.rename('TestJigData.json',file);
            //console.log("renamed test jig");
                fs.stat(file1, function(err, stat) {
                    if(err == null) {
                        fs.copy(file1, 'TestJigData.json',function (err) {
                            if(err) throw err;
                            console.log(TestJigData);
                        });
                        console.log("copied current data to test jig");
                    }
                });
        }
    });

    var response={"success":"success",TestJigData:TestJigData};
    console.log(response);

    res.send(response);
    //res.render('index', { title: 'Express' });
});
module.exports = router;
