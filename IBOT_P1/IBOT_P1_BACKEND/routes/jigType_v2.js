var express = require('express');
var router = express.Router();
var fs=require('fs');
var jigtype1=require('../config/jigtype1.json');
/* GET home page. */
router.post('/', function(req, res, next)
{
    var response = req.body.inputJsonStr;
    var jigTypeSelected=JSON.parse(response);
    res.send(jigtype1);
    //res.render('index', { title: 'Express' });
});
module.exports = router;
