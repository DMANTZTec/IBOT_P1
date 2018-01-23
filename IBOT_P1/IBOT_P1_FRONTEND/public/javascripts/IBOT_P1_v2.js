var modal1 = document.getElementById('myModal1');
var modal = document.getElementById('SettingsModalID');
var modal2 = document.getElementById('myModal2');
var type = document.getElementById('TestJigSelectList');


var testCaseData;
var testJigData;
var testJigList;
var LoadedTestCase;
var CurrentTestCaseData;
var PreviousTestcase;
var PreviousTestCaseButtonId;
var testResultDetail;
var testResultSummary;
var lastTestCaseFlag;
var loadedBoardData;
var tested=[];
var success=0;
var failed=0;
var attempts=0;
var TestResultDetails=
    {
        "DUT_ID": 1,
        "DUT_HW_VER": "XX:YY",
        "DUT_SW_VER": "PP:QQ",
        "DUT_NM": "Contol Card",
        "SN":"XXXXXXX",
        "HW_VER":"XX:XX",
        "SW_VER":"XX:XX",
        "MFGDT":"DD-MON-YYYY",
        "TestCaseFile":"TestCaseFile.JSON",
        "TEST_START_TS":"STARTTIMESTAMP",
        "TEST_END_TS":"ENDTIMESTAMP",
        "TEST_DURATION":"Test Duration In MilliSeconds",
        "TEST_RESULT": "SUCCESS/FAIL",
        "TOTAL_CNT":5,
        "TESTED_CNT": 4,
        "SUCCESS_CNT": 3,
        "FAIL_CNT":1,
        "DETAILS":
            [
                {
                    "TCID":1,
                    "TCSHORTNM":"XXXXX",
                    "DESC":"YYYYY",
                    "LAST_STATUS":"SUCCESS/FAIL",
                    "TRY_CNT":5,
                    "SUCCESS_CNT":4,
                    "FAIL_CNT":1
                },
                {
                    "TCID":2,
                    "TCSHORTNM":"XXXXX",
                    "DESC":"YYYYY",
                    "LAST_STATUS":"SUCCESS/FAIL",
                    "TRY_CNT":5,
                    "SUCCESS_CNT":4,
                    "FAIL_CNT":1
                }
            ]
    };

function LoadTestJigData() {
    //Initialize Test Jig Data
    //Initialize Test Case Data
    console.log("sending null req");
    var xhttp = new XMLHttpRequest();
    var url = "http://localhost:3001/LoadTestJigData_BE";
    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.onreadystatechange = function ()
    {
        if ((this.readyState == 4) && (this.status == 200))
        {
            console.log("after getting response" + xhttp.responseText);
            var response=JSON.parse(this.responseText);
            if(response.status=="success") {
                testJigList=response.TestJigList;
                testJigData=response.TestJigData;
                testCaseData = response.TestCaseData;
                //var testcases=testCaseData.TestCases;
                //console.log(testJigList);
                var totalCases = Object.keys(testCaseData.TestCases).length;
                document.getElementById('TestJigType').value = testJigData.DUT_NM;
                document.getElementById('totalCasesTxtBox').value = totalCases;
                console.log(testCaseData.TestCases.length);
                /*var  position= document.getElementById("buttons");
                for(i=0;i<testCaseData.TestCases.length;i++)
                {
                    var button = document.createElement("BUTTON").setAttribute("id",'tc1').appendChild();
                    position.appendChild(button);
                }*/
                //var select = document.getElementById ("TestJigSelectList");
                //var selectOption = select.options [select.selectedIndex] .value;
                    LoadTestCase(testCaseData.TestCases[0].TCID, 'tc1');
            }
            else
            {
                var error=response.error;
                document.getElementById('TestJigType').value = error;
            }
        }
    };
    xhttp.send();
}
function ReloadTestJigData(TestJigType){
    //Set TestJigType in the backend
    //LoadTestJigData
    var xhttp = new XMLHttpRequest();
    var url = "http://localhost:3001/LoadTestJigData_BE/Reload_BE";
    xhttp.open("POST", url, true);
    var request={"TestJigType":TestJigType};
    var params = JSON.stringify(request);
    console.log(params);
    var params = "inputJsonStr" + "=" + params;
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.onreadystatechange = function () {
        if ((this.readyState == 4) && (this.status == 200)) {
            console.log("after getting response" + xhttp.responseText);
            var response=JSON.parse(xhttp.responseText);
            if(response.success=="success") {
                LoadTestJigData();
            }
        }
    };
    xhttp.send(params);

    /*
    xhttp.onreadystatechange = function () {
        if ((this.readyState == 4) && (this.status == 200)){
            console.log("after getting response" + xhttp.responseText);
            var response=JSON.parse(this.responseText);
            testJigData=response.TestJigData;
            if(response.success=="success") {
                LoadTestJigData();
            }
            }

    };
    xhttp.send(params);
    */

}
function DisplaySettingsModal()
{
    modal.style.display = "block";
    type.innerHTML="";
    type.innerHTML = '<option>' + "SelectJigType" + '</option>';
    for (var i = 0; i < testJigList.TestJigList.length; i++) {
        type.innerHTML = type.innerHTML +
            '<option value="' + testJigList.TestJigList[i]['DUT_ID'] + '">' +
          testJigList.TestJigList[i]['DUT_ID'] + '</option>';
    }
}
function UpdateTestJigData(){
    //Set TestJigType in the backend
    //LoadTestJigData
}

function checkIfAllCasesRan(){

}

function UpdateTestResults(testCaseId,result){
//update Result Summary & Details
    
}

function closeBarcodeModal()
{
    modal1.style.display = "none";
}
function OKButtonForBarcode()
{
    modal1.style.display = "none";
}

function closeViewResultsModal()
{
    modal2.style.display = "none";
}
function closeSettingsModal()
{
    modal.style.display = "none";
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
var x = new Date();
function DisplayTimeIPInfo()
{
    var strcount;
    var x = new Date();
    document.getElementById('date_time').innerHTML = "Date & Time: "+x;
    DT=displayDateTime();
}
function displayDateTime()
{
    var refresh=1000; // Refresh rate in milli seconds
    mytime=setTimeout('DisplayTimeIPInfo()',refresh)
}
function reset() {
    document.getElementById("currently_tested_board").value = "";
    document.getElementById("case_text_box").value = "";
    document.getElementById("tested_text_box").value = "";
    document.getElementById("success_text_box").value = "";
    document.getElementById("fail_text_box").value = "";
    document.getElementById("inner_table").value = "";
}
function nextTestCase()
{
    var NextTestcase;
    for(i=0;i<testCaseData.TestCases.length;i++)
    {
        if(testCaseData.TestCases[i].TCID==LoadedTestCase.TCID)
        {
            NextTestcase=testCaseData.TestCases[i+1];
            console.log(NextTestcase);
        }
    }
    LoadTestCase(NextTestcase.TCID,'tc2');
}
function LoadTestCase(tcid,id)
{
    if(PreviousTestcase==undefined){}
    else
    document.getElementById(PreviousTestCaseButtonId).style.background="blue";
    for(i=0;i<testCaseData.TestCases.length;i++)
    {
        if (tcid == testCaseData.TestCases[i].TCID)
        {
            LoadedTestCase=testCaseData.TestCases[i];
            LoadedTestCase.TCStatus="loaded";
            LoadedTestCase.TCStartTime="";
            LoadedTestCase.TCEndTime="";
            LoadedTestCase.NumberOfSteps="";
            LoadedTestCase.LastRunStep="";
            LoadedTestCase.UILabelID="";

            PreviousTestcase=LoadedTestCase;
            PreviousTestCaseButtonId=id;
            console.log(LoadedTestCase);
            document.getElementById('TestCaseTitle').value = "TCID:"+LoadedTestCase.TCID +"   "+ LoadedTestCase.TCSHORTNM;
            //document.getElementById('testcase_nm').value = LoadedTestCase.TCSHORTNM;
            document.getElementById('TestCaseRunText').value = LoadedTestCase.DESC;
            document.getElementById(id).style.background="orange";
        }
    }
}
function YesButtonForTestCase() {

}
function NOButtonForTestCase() {

}
function RunTestCase(tcid,StepNum)
{
    console.log(tcid);
    LoadedTestCase.TCStartTime=x;
    console.log(LoadedTestCase);
    var DUTID_TCID=testCaseData.DUT +"_"+ tcid;
    console.log(DUTID_TCID);
    switch (DUTID_TCID)
    {
        case "M10_1" :
        {
            console.log("M10_1 selected");
            switch (StepNum)
            {
                case 1 :
                    console.log("Check if HDMI Cable is Connected");
                    var modal = document.getElementById('TestcasesModalId');
                    modal.style.display = "block";
                    document.getElementById("show").innerHTML = "Check if HDMI Cable is Connected";
                    document.getElementById('TestcasesModalYesBtnId').onclick=function () {
                        console.log("clicked");
                        var xhttp = new XMLHttpRequest();
                        var url = "http://localhost:3001/RunTestCase_BE";
                        var request =
                            {
                                DUTID_TCID: DUTID_TCID, StepNum: StepNum
                            };
                        var params = JSON.stringify(request);
                        console.log(params);
                        var params = "inputJsonStr" + "=" + params;
                        xhttp.open("POST", url, false);
                        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                        xhttp.onreadystatechange = function () {
                            if ((this.readyState == 4) && (this.status == 200)) {
                                console.log("after getting response" + xhttp.responseText);
                            }
                        };
                        xhttp.send(params);
                    }
                    setTimeout(function () {modal.style.display = "none";}, 5000);

            }
            break;
        }
        case "M10_2" :
        {
            console.log("M10_2 selected");
            switch (StepNum)
            {
                case 1 :
                    console.log("Push the power button");
                    var modal=document.getElementById('TestcasesModalId');
                    modal.style.display="block";
                    document.getElementById("show").innerHTML="Push the power button";
                    document.getElementById('TestcasesModalYesBtnId').onclick=function () {
                        console.log("clicked");
                        var xhttp = new XMLHttpRequest();
                        var url = "http://localhost:3001/RunTestCase_BE";
                        var request =
                            {
                                DUTID_TCID: DUTID_TCID, StepNum: StepNum
                            };
                        var params = JSON.stringify(request);
                        console.log(params);
                        var params = "inputJsonStr" + "=" + params;
                        xhttp.open("POST", url, true);
                        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                        xhttp.onreadystatechange = function () {
                            if ((this.readyState == 4) && (this.status == 200)) {
                                console.log("after getting response" + xhttp.responseText);
                            }
                        };
                        xhttp.send(params);
                    }
                    setTimeout(function(){ modal.style.display="none"; }, 5000);
                    break;
                case "2" :
                    console.log("Is the Power LED Turned Green?");
                    var modal=document.getElementById('TestcasesModalId');
                    modal.style.display="block";
                    document.getElementById("show").innerHTML="Is the Power LED Turned Green?";
                    setTimeout(function(){ modal.style.display="none"; }, 5000);
                    break;
            }
            break;
        }
        case "CC_1":
        {
            console.log("CC_1 selected");
            switch(StepNum)
            {
                case "1":
                    console.log("CC_1 step 1");
                    break;
                case "2":
                    console.log("CC_1 step 2");
                    break;
            }
            break;
        }
        case "CC_2":
        {
            switch(StepNum)
            {
                case "1":{
                    console.log("CC_2 step 1");
                    break;
                }
                case "2":{
                    console.log("CC_2 step 2");
                    break;
                }
                case "3":{
                    console.log("CC_2 step 3");
                    break;
                }
            }
            break;
        }
    }
    document.getElementById('start_icon').style.pointerEvents="none";
    document.getElementById('next_icon').style.pointerEvents="none";
    var xhttp = new XMLHttpRequest();
    var url = "http://localhost:3001/RunTestCase_BE";
    var request =
        {
            DUTID_TCID:DUTID_TCID,StepNum:StepNum
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
            LoadedTestCase.TCEndTime=x;
            attempts=attempts+1;
                if (!tested.includes(request.testcase_id)) {
                    tested.push(request.testcase_id);
                    if(status.status=="success")
                    {
                        success = success + 1;
                        //document.getElementById('message').innerHTML=current_TC +
                        //    "  tested successfully enter next button to test next testcase";
                        document.getElementById('success_text_box').value=success;
                    }
                    else
                    {
                        //document.getElementById('message').innerHTML=current_TC +
                         //   "  testing failed click on retry icon to retest or click on next icon to test next testcase";
                        failed=failed+1;
                        document.getElementById('fail_text_box').value=failed;
                    }
                    document.getElementById('tested_text_box').value=tested.length;
                }
            console.log(success);
            console.log(failed);
            console.log(tested.length);
            console.log(attempts);
           // document.getElementById('tested_text_box').value=tested;
            document.getElementById('retry_icon').style.pointerEvents="auto";
            document.getElementById('next_icon').style.pointerEvents="auto";
            document.getElementById('start_icon').style.pointerEvents="none";
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
/*function nextTestcase()
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
*/
function viewResults()
{
    modal2.style.display = "block";
    console.log(TestResultDetails.DETAILS);
    var txt;
    //document.getElementById('show').innerHTML="teja";
    txt += "<table border='1'  id='table'>" +
        "<tr><th>TID</th>" +
        "<th>TESTCASE</th>" +
        "<th>TESTCASE</th>" +
        "<th>TESTCASE</th>" +
        "<th>TESTCASE</th>" +
        "<th>TESTCASE</th>" +
        "<th>STATUS</th></tr>"
    // document.getElementById("table").innerHTML += '<div class="d" style="border:1px solid";">';
    for (x in TestResultDetails.DETAILS) {
        txt += "<tr id='tr'><td>" + TestResultDetails.DETAILS[x].TCID + "</td>" +
            "<td>" +TestResultDetails.DETAILS[x].TCSHORTNM +"</td>"+
        "<td>"+TestResultDetails.DETAILS[x].DESC+"</td>"+
            "<td>"+TestResultDetails.DETAILS[x].LAST_STATUS+"</td>"+
            "<td>"+TestResultDetails.DETAILS[x].TRY_CNT+"</td>"+
            "<td>"+TestResultDetails.DETAILS[x].SUCCESS_CNT+"</td>"+
            "<td>"+TestResultDetails.DETAILS[x].FAIL_CNT+"</td>"+
            "</tr>";
    }
    txt += "</table>"
    document.getElementById("show").innerHTML = txt;
}