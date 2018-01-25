var express = require('express');
var router = express.Router();
var fs=require('fs');
var jigtype1=require('../config/jigtype1.json');
/* GET home page. */
router.all('/', function(req, res, next)
{
    var request = req.body.inputJsonStr;
    var jsonrequest=JSON.parse(request);
    var DUTID_TCID=jsonrequest.DUTID_TCID;
    var StepNum=jsonrequest.StepNum;
    console.log(DUTID_TCID + StepNum);
    function Success()
    {
        var response={"status":"success"};
        res.send(response);
    }
    function Failed()
    {
        var response={"status":"Failed"};
        res.send(response);
    }
    switch (DUTID_TCID)
    {
        case "M10_1" :
        {
            console.log("M10_1 selected");
            switch (StepNum)
            {
                case 1 :
                    console.log("Check if HDMI Cable is Connected");
                    Success();
                    break;
            }
            break;
        }
        case "M10_2" :
        {
            console.log("M10_2 selected");
            switch (StepNum)
            {
                case 1 :
                    console.log("Push the power button");
                    Success();
                    break;
                case 2 :
                    console.log("Is the Power LED Turned Green?");
                    Success();
                    break;
            }
            break;
        }
        case "CC_1":
        {
            console.log("CC_1 selected");
            switch(StepNum)
            {
                case 1:
                    console.log("CC_1 step 1");
                    Success();
                    break;
                case 2:
                    console.log("CC_1 step 2");
                    Success();
                    break;
            }
            break;
        }
        case "CC_2":
        {
            console.log("CC_2 selected");
            switch(StepNum)
            {
                case 1:{
                    console.log("CC_2 step 1");
                    Success();
                    break;
                }
                case 2:{
                    console.log("CC_2 step 2");
                    Success();
                    break;
                }
                case 3:{
                    console.log("CC_2 step 3");
                    Success();
                    break;
                }
            }
            break;
        }
    }
});
module.exports = router;






    /*for(i=0;i<testcases.length;i++)
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
    //res.render('index', { title: 'Express' });*/
