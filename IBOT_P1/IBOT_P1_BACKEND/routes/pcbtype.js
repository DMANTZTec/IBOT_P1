var express = require('express');
var router = express.Router();
var pcb=require('../config/PCB.json');
var pcb1testcases=require('../config/PCB1_TESTCASES.json');
var fs=require('fs');

/* GET home page. */
router.post('/', function(req, res, next)
{
    req="PCBTYPE1";
    //var request = req.body.inputJsonStr;
    //console.log(request);
    console.log(pcb.PCBS[0].PCB_TYPE);
    console.log(pcb.PCBS[0].PCB_ID);
    if(req==pcb.PCBS[0].PCB_TYPE){
        res.send(pcb1testcases);
        console.log(pcb1testcases);
    }

    //res.render('index', { title: 'Express' });
});

module.exports = router;
