var express = require('express');
var router = express.Router();
var pcb=require('../config/PCB.json');
var pcb1testcases=require('../config/PCB1_TESTCASES.json');
var fs=require('fs');

/* GET home page. */
router.post('/', function(req, res, next)
{
    console.log(pcb.PCBS[0].PCB_TYPE);
    console.log(pcb.PCBS[0].PCB_ID);
    var pcbTypeSelected = req.body.inputJsonStr;
    var jsonPcbTypeSelected=JSON.parse(pcbTypeSelected);
    console.log(jsonPcbTypeSelected);
    if(jsonPcbTypeSelected.pcbtype==pcb.PCBS[0].PCB_TYPE){
        res.send(pcb1testcases);
        console.log(pcb1testcases);
    }
    //res.render('index', { title: 'Express' });
});

module.exports = router;
