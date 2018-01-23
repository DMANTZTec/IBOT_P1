var express = require('express');
var router = express.Router();
var fs=require('fs');

var TestJigList=require('../TestJigList.json');
var TestJigData=require('../TestJigData.json');
var TestCaseData=require('../TestCaseData.json');
var TestJigType;
var testJigConfigFileNm = './TestJigData.json';
router.all('/', function(req, res, next) {
    /*
    fs.stat('TestJigData.json', function(err, stat) {
        if(err == null) {
    */
    console.log(testJigConfigFileNm);
    if (fs.existsSync(testJigConfigFileNm)) {
        var TestJigData = JSON.parse(fs.readFileSync(testJigConfigFileNm));
        console.log("Test jig exists load");
        console.log(TestJigData);
        var response =
            {
                status: "success",
                TestJigList: TestJigList,
                TestJigData: TestJigData,
                TestCaseData: TestCaseData
            };
        res.send(response);
    }
    else {
        console.log( testJigConfigFileNm + "does not exist");
        response = {"status": "error", "error": "test jig file not exists"};
        res.send(response);
    }
});
//This route is used when user selects a different Test Jig type from Settings in UI
router.all('/Reload_BE', function(req, res, next) {

    console.log('Enter: Route /Reload_BE');
    //var testJigConfigFileNm = 'TestJigData.json';
    var newTestJigConfigFileNm;
    var request = req.body.inputJsonStr;
    var jsonrequest = JSON.parse(request);
    TestJigType = jsonrequest.TestJigType;
    console.log(TestJigType);
    for (var i = 0; i < TestJigList.TestJigList.length; i++) {
        console.log('Looping through' + i);
        if (TestJigType == TestJigList.TestJigList[i].DUT_ID) {
            newTestJigConfigFileNm = TestJigList.TestJigList[i].DESC_FILE;
            console.log(newTestJigConfigFileNm);
            break;
        }
    }
    //Take Backup of Current TestJigData file
    if (fs.existsSync(testJigConfigFileNm)) {
        console.log("TestJigData.json exits");
        fs.rename(testJigConfigFileNm, testJigConfigFileNm + '.bkup');
    }
    else {
        console.log('There is no current TestJigData.json file');
    }
    fs.copyFileSync(newTestJigConfigFileNm, testJigConfigFileNm);

    var response={"success":"success"};
    //var response={"success":"success",TestJigData:TestJigData};
    console.log(response);

    res.send(response);

});

    /*
    for(var i=0;i<TestJigList.TestJigList.length;i++) {
        if (TestJigData.DUT_ID == TestJigList.TestJigList[i].DUT_ID) {
            var file = TestJigList.TestJigList[i].DESC_FILE;
            console.log(TestJigList.TestJigList[i].DESC_FILE);
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
*/
module.exports = router;
