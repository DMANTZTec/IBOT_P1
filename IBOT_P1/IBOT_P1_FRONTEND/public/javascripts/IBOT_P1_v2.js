var modal1 = document.getElementById('myModal1');
var modal = document.getElementById('myModal');
var modal2 = document.getElementById('myModal2');

function settings()
{
    modal.style.display = "block";
}
function closeSettingsModal()
{
    modal.style.display = "none";
}
function barcodeScanner()
{
    modal1.style.display = "block";
    console.log("teja");
    //var testcases=JSON.parse(jigtype1_testcases);
    //		console.log(testcases);
    var testcases={
        "testcase1":"TC1",
        "testcase2":"TC2",
        "testcase3":"TC3",
        "testcase4":"TC4",
        "testcase5":"TC5",
        "testcase6":"TC6"
    };
    document.getElementById('inner_table').innerHTML=testcases.testcase1;
    document.getElementById('tc1').style.background="orange";
    document.getElementById("start_icon").style.pointerEvents="auto";

}
function closeBarcodeModal()
{
    modal1.style.display = "none";
}
function OKButtonForBarcode()
{
    modal1.style.display = "none";
}

function viewResults()
{
    modal2.style.display = "block";

}
function closeViewResultsModal()
{
    modal2.style.display = "none";

}
/*var readline=require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
rl.question('What do you think of Node.js? ', (answer) => {
  // TODO: Log the answer in a database
  console.log(`Thank you for your valuable feedback: ${answer}`);
  rl.close();
});*/

function startTesting()
{
    console.log("teja");
}

function testJig()
{
    var item_modal = document.getElementById('item_modal');
    var selectedJigType =  item_modal.options[item_modal.selectedIndex].value ;
    console.log(selectedJigType);
    document.getElementById('currently_tested_board').value=selectedJigType;
    var xhttp = new XMLHttpRequest();
    var url = "http://localhost:3001/jigType";
    var request =
        {
            jigtype:selectedJigType
        };
    var params = JSON.stringify(request);
    console.log(params);
    var params = "inputJsonStr" + "=" + params;
    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.onreadystatechange = function () {
        if ((this.readyState == 4) && (this.status == 200)) {
            console.log("after getting response" + xhttp.responseText);
            var testcases = JSON.parse(this.responseText);
            var totalCases=Object.keys(testcases).length;
            console.log(totalCases);
            document.getElementById('case_text_box').value=totalCases;
        }
    };
    xhttp.send(params);
}
function datetime()
{
    var strcount;
    var x = new Date();
    document.getElementById('date_time').innerHTML = "Date & Time: "+x;
    DT=displayDateTime();
}
function displayDateTime()
{
    var refresh=1000; // Refresh rate in milli seconds
    mytime=setTimeout('datetime()',refresh)
}
function reset() {
    document.getElementById("currently_tested_board").value = "";
    document.getElementById("case_text_box").value = "";
    document.getElementById("tested_text_box").value = "";
    document.getElementById("success_text_box").value = "";
    document.getElementById("fail_text_box").value = "";
    document.getElementById("inner_table").value = "";
}
