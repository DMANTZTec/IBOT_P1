var express = require('express');
var router = express.Router();
var fs=require('fs');
/* GET home page. */
router.all('/', function(req, res, next)
{
   var code={"barcode":"pcb000111"};
    res.send(code);
    //res.render('index', { title: 'Express' });
});
module.exports = router;
