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
    var pcbtypeSelected=JSON.parse(request);
    console.log(pcbtypeSelected);
   //var pcbtypeSelected={pcbtype:"PCBTYPE1"};
    var bonecheck="good";
    for(i=0;i<pcb.PCBS.length;i++) {
        if (pcbtypeSelected.pcbtype == pcb.PCBS[i].PCB_TYPE)
        {
            var testcase = testcases[i].PCB_TESTCASES;
            for (j= 0; j < testcase.length; j++)
            {
                if (testcase[j].testing == bonecheck)
                {
                    status[j] = "success";
                }
                else
                {
                    status[j] = "failed";
                }
            }

        }
    }
    res.send(status);
    console.log(status);
    //res.render('index', { title: 'Express' });
});
module.exports = router;
