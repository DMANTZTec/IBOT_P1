var express = require('express');
var router = express.Router();
var fs=require('fs');
var pcb=require('../config/PCB.json');
var pcb1testcases=require('../config/PCB1_TESTCASES.json');
var pcb2testcases=require('../config/PCB2_TESTCASES.json');
var testcases=[pcb1testcases,pcb2testcases];
/* GET home page. */
router.all('/', function(req, res, next)
{
    var status=[];
    var request = req.body.inputJsonStr;
    var jsonrequest=JSON.parse(request);
    var pcbtypeSelected=jsonrequest.pcbtype;
    var testcaseSelected=jsonrequest.testcaseid;
    console.log(pcbtypeSelected);
    console.log(pcbtypeSelected);
    console.log(testcaseSelected);

    //var pcbtypeSelected={pcbtype:"PCBTYPE1"};
    for(i=0;i<pcb.PCBS.length;i++) {
        if (pcbtypeSelected.pcbtype == pcb.PCBS[i].PCB_TYPE)
        {
            var testcase = testcases[i].PCB_TESTCASES;
            for (j= 0; j < testcase.length; j++)
            {
                if (testcase[j].TESTCASE_ID ==testcaseSelected )
                {
                    status[j] = "success";
                }
                else
                {
                    status[j] = "failed";
                }
                res.send(status);
                console.log(status);

            }

        }
    }
   // res.send(status);
    //res.render('index', { title: 'Express' });
});
module.exports = router;
