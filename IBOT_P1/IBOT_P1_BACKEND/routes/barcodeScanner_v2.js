var express = require('express');
var router = express.Router();
const readline = require('readline');
var fs=require('fs');
/* GET home page. */
router.all('/', function(req, res, next)
{
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.question('enter barcode', (answer) => {
        console.log(answer);
    rl.close();
   // res.send(answer);
});
   // console.log(answer);
    //res.send(answer);
    //res.render('index', { title: 'Express' });
});
module.exports = router;
