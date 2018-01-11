var express = require('express');
var router = express.Router();
var pcb=require('../config/PCB.json');
var pcb1testcases=require('../config/PCB1_TESTCASES.json');
var pcb2testcases=require('../config/PCB2_TESTCASES.json');

var fs=require('fs');
var testcases=[pcb1testcases,pcb2testcases];
/* GET home page. */
router.post('/', function(req, res, next)
{
    console.log(pcb.PCBS[0].PCB_TYPE);
    console.log(pcb.PCBS[0].PCB_ID);
    console.log(pcb.PCBS.length);
    var pcbTypeSelected = req.body.inputJsonStr;
    var jsonPcbTypeSelected=JSON.parse(pcbTypeSelected);
    console.log(jsonPcbTypeSelected);
    for(i=0;i<pcb.PCBS.length;i++) {
        if (jsonPcbTypeSelected.pcbtype == pcb.PCBS[i].PCB_TYPE) {
            res.send(testcases[i]);
            console.log(testcases[i]);
        }
    }
    //res.render('index', { title: 'Express' });
});
module.exports = router;
