var modal1 = document.getElementById('myModal1');
var modal = document.getElementById('myModal');
var modal2 = document.getElementById('myModal2');

var testCaseData;
var testJigData;
var testJigList;
var loadedTestCase;
var PreviousTestcase;
var PreviousTestCaseButtonId;
var testResultDetail;
var testResultSummary;
var lastTestCaseFlag;
var loadedBoardData;

function checkIfAllCasesRan(){

}

function UpdateTestResults(testCaseId,result){
//update Result Summary & Details
}


function LoadTestJigData() {
    //Initialize Test Jig Data
    //Initialize Test Case Data
}

function ReloadTestJigData(TestJigType){
    //Set TestJigType in the backend
    //LoadTestJigData
}

function UpdateTestJigData(){
    //Set TestJigType in the backend
    //LoadTestJigData
}
function DisplaySettingsModal() {
    modal.style.display = "block";
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
function closeSettingsModal()
{
    modal.style.display = "none";
}

function settings()
{
    console.log("sending null req");
    var xhttp = new XMLHttpRequest();
    var url = "http://localhost:3001/settings_v2";
    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.onreadystatechange = function ()
    {
        if ((this.readyState == 4) && (this.status == 200))
        {
            console.log("after getting response" + xhttp.responseText);
            var jsonresponse=JSON.parse(this.responseText);
            if(jsonresponse.status=="success") {
                var testcases = jsonresponse.testcases;
                TestCaseData = testcases.testcases;
                console.log(TestCaseData);
                var totalCases = Object.keys(TestCaseData).length;

                document.getElementById('TestJigType').value = jsonresponse.testjig;
                document.getElementById('case_text_box').value = totalCases;
                LoadTestCase(TestCaseData[0].TCID,'tc1');
            }
            else
            {
                var error=jsonresponse.error;
                document.getElementById('TestJigType').value = error;
            }
        }
    };
    xhttp.send();
}

function ScanBarCode()
{
    modal1.style.display = "block";
    var barcode="dmantztk20-01-181.12.2";
    var SN=barcode.slice(0,8);
    var MFGDT=barcode.substr(8,8);
    var HWver=barcode.substr(16,3);
    var SWver=barcode.substr(19,3);
    console.log(SN);
    console.log(MFGDT);
    console.log(HWver);
    console.log(SWver);
    document.getElementById('')

    document.getElementById("start_icon").style.pointerEvents="auto";
    document.getElementById('next_icon').style.pointerEvents="auto";
    //document.getElementById('scanner_image').style.pointerEvents="none";
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

function LoadTestCase(tcid,id)
{
    var PreviousTestcaseData,pid;
    for(i=0;i<TestCaseData.length;i++)
    {
        if (tcid == TestCaseData[i].TCID)
        {
            LoadedTestcase=TestCaseData[i];
            PreviousTestcaseData=LoadedTestcase;
            pid=id;
            console.log(LoadedTestcase);
            document.getElementById('testcase_id').value = LoadedTestcase.TCID;
            document.getElementById('testcase_nm').value = LoadedTestcase.TC_NM;
            document.getElementById('testcase_desc').value = LoadedTestcase.TC_DESC;
            document.getElementById(id).style.background="orange";
        }
    }
}

function RunTestCase(tcid)
{
    console.log(tcid);
}
function startTesting()
{
    document.getElementById('start_icon').style.pointerEvents="none";
    document.getElementById('next_icon').style.pointerEvents="none";
    var current_TC=document.getElementById('testcase_id').value;
    var xhttp = new XMLHttpRequest();
    var url = "http://localhost:3001/startTesting_v2";
    var request =
        {
            testcase_id:current_TC
        };
    var params = JSON.stringify(request);
    console.log(params);
    var params = "inputJsonStr" + "=" + params;
    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.onreadystatechange = function ()
    {
        if ((this.readyState == 4) && (this.status == 200))
        {
            console.log("after getting response" + xhttp.responseText);
            var status=JSON.parse(this.responseText);
            document.getElementById('tested_text_box').value=tested;
            if(status.status=="success")
            {
                document.getElementById('message').innerHTML=current_TC +
                    "  tested successfully enter next button to test next testcase";
            }
            else
            {
                document.getElementById('message').innerHTML=current_TC +
                    "  testing failed click on retry icon to retest or click on next icon to test next testcase";
            }
            document.getElementById('retry_icon').style.pointerEvents="auto";
            document.getElementById('next_icon').style.pointerEvents="auto";
            document.getElementById('start_icon').style.pointerEvents="auto";
        }
    };
    xhttp.send(params);
}












function retryTestCase()
{
    document.getElementById('retry_icon').style.pointerEvents="none";
    document.getElementById('start_icon').style.pointerEvents="none";
    document.getElementById('next_icon').style.pointerEvents="none";
    var current_TC=document.getElementById('testcase_id').value;
    var xhttp = new XMLHttpRequest();
    var url = "http://localhost:3001/startTesting_v2";
    var request =
        {
            testcase_id:current_TC
        };
    var params = JSON.stringify(request);
    console.log(params);
    var params = "inputJsonStr" + "=" + params;
    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.onreadystatechange = function ()
    {
        if ((this.readyState == 4) && (this.status == 200))
        {
            console.log("after getting response" + xhttp.responseText);
            var status=JSON.parse(this.responseText);
            if(status.status=="success")
            {
                document.getElementById('message').innerHTML=current_TC +
                    "  tested successfully enter next button to test next testcase";
            }
            else
            {
                document.getElementById('message').innerHTML=current_TC +
                    "  testing failed click on retry icon to retest or click on next icon to test next testcase";
            }
            document.getElementById('retry_icon').style.pointerEvents="auto";
            document.getElementById('next_icon').style.pointerEvents="auto";
            document.getElementById('start_icon').style.pointerEvents="auto";
        }
    };
    xhttp.send(params);
}
function nextTestcase()
{
    var current_TC=document.getElementById('testcase_id').value;
    var xhttp = new XMLHttpRequest();
    var url = "http://localhost:3001/nextTestcase_v2";
    var request =
        {
            testcase_id:current_TC
        };
    var params = JSON.stringify(request);
    console.log(params);
    var params = "inputJsonStr" + "=" + params;
    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.onreadystatechange = function ()
    {
        if ((this.readyState == 4) && (this.status == 200))
        {
            console.log("after getting response" + xhttp.responseText);
            var jsonresponse=JSON.parse(this.responseText);
            var nextTestcase=jsonresponse.nexttestcase;
            document.getElementById('testcase_id').value=nextTestcase;
            //document.getElementById('retry_icon').style.pointerEvents="auto";
           // document.getElementById('next_icon').style.pointerEvents="auto";
           // document.getElementById('start_icon').style.pointerEvents="auto";
        }
    };
    xhttp.send(params);
}