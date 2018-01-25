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
var testResultSummary={TotalCnt:0,TestedCnt:0,SuccessCnt:0,FailCnt:0};
var lastTestCaseFlag;
var loadedBoardData;
var testedTestCases=[];
var testResultDetail={"DETAILS":[]};
var TestResultDetails=
    {
        "DUT_ID": testCaseData.DUT_ID,
        "DUT_HW_VER": "XX:YY",
        "DUT_SW_VER": "PP:QQ",
        "DUT_NM": testCaseData.TCSHORTNM,
        "SN":"XXXXXXX",
        "HW_VER":"XX:XX",
        "SW_VER":"XX:XX",
        "MFGDT":"DD-MON-YYYY",
        "TestCaseFile":testJigData.TestCaseFile,
        "TEST_START_TS":"STARTTIMESTAMP",
        "TEST_END_TS":"ENDTIMESTAMP",
        "TEST_DURATION":"Test Duration In MilliSeconds",
        "TEST_RESULT": "SUCCESS/FAIL",
        "TOTAL_CNT":testResultSummary.TotalCnt,
        "TESTED_CNT": testResultSummary.TestedCnt,
        "SUCCESS_CNT": testResultSummary.SuccessCnt,
        "FAIL_CNT":testResultSummary.FailCnt,
        "DETAILS": []
    };
function UpdateTestJigData(){
    //Set TestJigType in the backend
    //LoadTestJigData
}

function checkIfAllCasesRan()
{
    if(testedTestCases.length==testCaseData.TestCases.length){
        document.getElementById('TestCaseRunText').value="All test cases had ran";
    }
}

function UpdateTestResults(testCaseId,result)
{
//update Result Summary & Details
    testResultSummary.TotalCnt=testResultSummary.TotalCnt+1;
    if (!testedTestCases.includes(testCaseId))
    {
        testedTestCases.push(testCaseId);
        for (var i = 0; i < testCaseData.TestCases.length; i++)
        {
            if (testCaseData.TestCases[i].TCID == testCaseId)
            {
                testResultSummary.TestedCnt=testResultSummary.TestedCnt+1;
                testResultDetail.DETAILS[i].TCID=LoadedTestCase.TCID;
                testResultDetail.DETAILS[i].TCSHORTNM=LoadedTestCase.TCSHORTNM;
                testResultDetail.DETAILS[i].DESC=LoadedTestCase.DESC;
                testResultDetail.DETAILS[i].LAST_STATUS = result;
                testResultDetail.DETAILS[i].TRY_CNT = 1;
                if (result == "success") {
                    testResultDetail.DETAILS[i].SUCCESS_CNT = 1;
                    testResultSummary.SuccessCnt=testResultSummary.SuccessCnt+1;
                }
                else {
                    testResultDetail.DETAILS[i].FAIL_CNT = 1;
                    testResultSummary.FailCnt=testResultSummary.FailCnt+1;
                }
            }
        }
    }
    else
    {
        for (i = 0; i < testCaseData.TestCases.length; i++)
        {
            if (testCaseData.TestCases[i].TCID == testCaseId)
            {
                testResultDetail.DETAILS[i].TCID=LoadedTestCase.TCID;
                testResultDetail.DETAILS[i].TCSHORTNM=LoadedTestCase.TCSHORTNM;
                testResultDetail.DETAILS[i].DESC=LoadedTestCase.DESC;
                testResultDetail.DETAILS[i].TRY_CNT = testResultDetail.DETAILS[i].TRY_CNT + 1;
                if (result == "success") {
                    testResultDetail.DETAILS[i].SUCCESS_CNT = testResultDetail.DETAILS[i].SUCCESS_CNT+1;
                    if(testResultDetail.DETAILS[i].LAST_STATUS=="failed") {
                        testResultSummary.SuccessCnt = testResultSummary.SuccessCnt + 1;
                        testResultSummary.FailCnt = testResultSummary.FailCnt - 1;
                    }
                }
                else {
                    testResultDetail.DETAILS[i].FAIL_CNT = testResultDetail.DETAILS[i].FAIL_CNT + 1;
                    if(testResultDetail.DETAILS[i].LAST_STATUS=="success") {
                        testResultSummary.SuccessCnt = testResultSummary.SuccessCnt - 1;
                        testResultSummary.FailCnt = testResultSummary.FailCnt + 1;
                    }
                }
                testResultDetail.DETAILS[i].LAST_STATUS = result;
            }
        }
    }
    console.log(testResultDetail);
    console.log(testResultSummary);
    document.getElementById('tested_text_box').value=testResultSummary.TestedCnt;
    document.getElementById('success_text_box').value=testResultSummary.SuccessCnt;
    document.getElementById('fail_text_box').value=testResultSummary.FailCnt;
}

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
            document.getElementById('tc').style.display='block';
            console.log("after getting response" + xhttp.responseText);
            var response=JSON.parse(this.responseText);
            if(response.status=="success") {
                testJigList=response.TestJigList;
                testJigData=response.TestJigData;
                testCaseData = response.TestCaseData;
                for(i=0;i<testCaseData.TestCases.length;i++)
                {
                    testResultDetail.DETAILS.push({});
                }
                console.log(testResultDetail.DETAILS);

                var totalCases = Object.keys(testCaseData.TestCases).length;
                document.getElementById('TestJigType').value = testJigData.DUT_NM;
                document.getElementById('totalCasesTxtBox').value = totalCases;
                console.log(testCaseData.TestCases.length);
                for(var i=0;i<testCaseData.TestCases.length;i++)
                {
                    var button = document.createElement("BUTTON");
                    var ButtonID=("_"+ i);
                    document.getElementById('tc').appendChild(button).setAttribute("id",ButtonID);
                    button.innerText=testCaseData.TestCases[i].TCSHORTNM;
                    testCaseData.TestCases[i].UILabelID=ButtonID;
                    button.onclick= function()
                    {
                        var ClickedBtnID=event.srcElement.id;
                        var j=ClickedBtnID.slice(1);
                        console.log(j);
                        LoadTestCase(testCaseData.TestCases[j].TCID,testCaseData.TestCases[j].UILabelID);
                    }
                }
                LoadTestCase(testCaseData.TestCases[0].TCID,testCaseData.TestCases[0].UILabelID);
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
function ReloadTestJigData(TestJigType)
{
    //Set TestJigType in the backend
    //LoadTestJigData
    var xhttp = new XMLHttpRequest();
    var url = "http://localhost:3001/LoadTestJigData_BE/Reload_BE";
    xhttp.open("POST", url, false);
    var request={"TestJigType":TestJigType};
    var params = JSON.stringify(request);
    console.log(params);
    var params = "inputJsonStr" + "=" + params;
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(params);
    console.log("after getting response" + xhttp.responseText);
    var response=JSON.parse(xhttp.responseText);
    if(response.success=="success")
    {
        document.location.reload(true);
        LoadTestJigData();
    }
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
    LoadTestCase(NextTestcase.TCID,NextTestcase.UILabelID);
}
function retryTestCase()
{
    LoadTestCase(LoadedTestCase.TCID,LoadedTestCase.UILabelID);
    RunTestCase(LoadedTestCase.TCID,LoadedTestCase.Steps[0].StepNumber);
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

            PreviousTestcase=LoadedTestCase;
            PreviousTestCaseButtonId=id;
            document.getElementById('TestCaseTitle').value = "TCID:"+LoadedTestCase.TCID +"   "+ LoadedTestCase.TCSHORTNM;
            //document.getElementById('testcase_nm').value = LoadedTestCase.TCSHORTNM;
            document.getElementById('TestCaseRunText').value = LoadedTestCase.DESC;
            document.getElementById(id).style.background="orange";
            document.getElementById(id).innerText=LoadedTestCase.TCSHORTNM;
        }
    }
}

function RunTestCase(tcid,StepNum)
{
    console.log(tcid);
    LoadedTestCase.TCStartTime = x;
    console.log(LoadedTestCase);
    Disable();
    var DUTID_TCID = testCaseData.DUT + "_" + tcid;
    console.log(DUTID_TCID);
    switch (DUTID_TCID)
    {
        case "M10_1" :
            console.log("M10_1 selected");
            console.log("Check if HDMI Cable is Connected");
            var modal = document.getElementById('TestcasesModalId');
            modal.style.display = "block";
            document.getElementById("show").innerHTML = "Check if HDMI Cable is Connected";
            setTimeout(function ()
            {
                modal.style.display = "none";
                LoadTestCase(LoadedTestCase.TCID, LoadedTestCase.UILabelID);
            }, 5000);

            document.getElementById('TestcasesModalYesBtnId').onclick = function () {
                console.log("clicked yes");
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
                xhttp.send(params);
                console.log("after getting response" + xhttp.responseText);
                var response=JSON.parse(xhttp.responseText);
                var result=response.status;
                UpdateTestResults(tcid,result);
                checkIfAllCasesRan();
                console.log(testResultDetail);
                console.log(testResultSummary);
                Enable();
            }
            break;
        case "M10_2" :
            console.log("M10_2 selected");
            console.log("Push the power button");
            var modal = document.getElementById('TestcasesModalId');
            modal.style.display = "block";
            document.getElementById("show").innerHTML = "Push the power button";
            setTimeout(function () {
                modal.style.display = "none";
                LoadTestCase(LoadedTestCase.TCID, LoadedTestCase.UILabelID);
            }, 5000);
            document.getElementById('TestcasesModalYesBtnId').onclick = function () {
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
                xhttp.send(params);
                console.log("after getting response" + xhttp.responseText);
                var response = JSON.parse(xhttp.responseText);
                var result=response.status;
                if (result != "success") {
                    UpdateTestResults(tcid,result);
                }
                else {
                    console.log("Is the Power LED Turned Green?");
                    var modal = document.getElementById('TestcasesModalId');
                    modal.style.display = "block";
                    document.getElementById("show").innerHTML = "Is the Power LED Turned Green?";
                    setTimeout(function () {
                        modal.style.display = "none";
                        LoadTestCase(LoadedTestCase.TCID, LoadedTestCase.UILabelID);
                    }, 5000);
                    document.getElementById('TestcasesModalYesBtnId').onclick = function () {
                        modal.style.display = "none";
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
                        xhttp.send(params);
                        console.log("after getting response" + xhttp.responseText);
                        var response=JSON.parse(xhttp.responseText);
                        var result=response.status;
                        UpdateTestResults(tcid,result);
                        checkIfAllCasesRan();
                        console.log(testResultDetail);
                        console.log(testResultSummary);
                        Enable();
                    }
                }
            }
            break;
        case "CC_1":
            console.log("CC_1 selected");
            console.log("CC_1 step 1");
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
            xhttp.send(params);
            console.log("after getting response" + xhttp.responseText);
            var response=JSON.parse(xhttp.responseText);
            var result=response.status;
            UpdateTestResults(tcid,result);
            checkIfAllCasesRan();
            console.log(testResultDetail);
            console.log(testResultSummary);
            Enable();
            break;
        case "CC_2":
            console.log("CC_2 step 1");
            console.log("Push the power button");
            var modal = document.getElementById('TestcasesModalId');
            modal.style.display = "block";
            document.getElementById("show").innerHTML = "Push the power button";
            setTimeout(function () {
                modal.style.display = "none";
                LoadTestCase(LoadedTestCase.TCID, LoadedTestCase.UILabelID);
            }, 5000);
            document.getElementById('TestcasesModalYesBtnId').onclick = function () {
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
                xhttp.send(params);
                console.log("after getting response" + xhttp.responseText);
                var response = JSON.parse(xhttp.responseText);
                var result=response.status;
                if (result != "success") {
                    UpdateTestResults(tcid,result);
                }
                else {
                    console.log("Is the Power LED Turned Green?");
                    var modal = document.getElementById('TestcasesModalId');
                    modal.style.display = "block";
                    document.getElementById("show").innerHTML = "Is the Power LED Turned Green?";
                    setTimeout(function () {
                        modal.style.display = "none";
                        LoadTestCase(LoadedTestCase.TCID, LoadedTestCase.UILabelID);
                    }, 5000);
                    document.getElementById('TestcasesModalYesBtnId').onclick = function () {
                        modal.style.display = "none";
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
                        xhttp.send(params);
                        console.log("after getting response" + xhttp.responseText);
                        var response=JSON.parse(xhttp.responseText);
                        var result=response.status;
                        UpdateTestResults(tcid,result);
                        checkIfAllCasesRan();
                        console.log(testResultDetail);
                        console.log(testResultSummary);
                        Enable();
                    }
                }
            }
            break;
        case "IRNFC_1":
            console.log("IRNFC TC1 selected");
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
            xhttp.send(params);
            console.log("after getting response" + xhttp.responseText);
            var response=JSON.parse(xhttp.responseText);
            var result=response.status;
            UpdateTestResults(tcid,result);
            checkIfAllCasesRan();
            console.log(testResultDetail);
            console.log(testResultSummary);
            Enable();
            break;
        case "IRNFC_2":
            console.log("IRNFC TC2 selected");
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
            xhttp.send(params);
            console.log("after getting response" + xhttp.responseText);
            var response=JSON.parse(xhttp.responseText);
            var result=response.status;
            UpdateTestResults(tcid,result);
            checkIfAllCasesRan();
            console.log(testResultDetail);
            console.log(testResultSummary);
            Enable();
            break;
        case "IRNFC_3":
        console.log("IRNFC TC3 selected");
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
        xhttp.send(params);
        console.log("after getting response" + xhttp.responseText);
            var response=JSON.parse(xhttp.responseText);
            var result=response.status;
            UpdateTestResults(tcid,result);
            checkIfAllCasesRan();
            console.log(testResultDetail);
            console.log(testResultSummary);
            Enable();
            break;
        case "IRNFC_4":
            console.log("IRNFC TC4");
            console.log("Push the power button");
            var modal = document.getElementById('TestcasesModalId');
            modal.style.display = "block";
            document.getElementById("show").innerHTML = "Push the power button";
            setTimeout(function () {
                modal.style.display = "none";
                LoadTestCase(LoadedTestCase.TCID, LoadedTestCase.UILabelID);
            }, 5000);
            document.getElementById('TestcasesModalYesBtnId').onclick = function () {
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
                xhttp.send(params);
                console.log("after getting response" + xhttp.responseText);
                var response = JSON.parse(xhttp.responseText);
                var result=response.status;
                if (result != "success")
                {
                    UpdateTestResults(tcid,result);
                }
                else
                    {
                    console.log("Is the Power LED Turned Green?");
                    var modal = document.getElementById('TestcasesModalId');
                    modal.style.display = "block";
                    document.getElementById("show").innerHTML = "Is the Power LED Turned Green?";
                    setTimeout(function () {
                        modal.style.display = "none";
                        LoadTestCase(LoadedTestCase.TCID, LoadedTestCase.UILabelID);
                    }, 5000);
                    document.getElementById('TestcasesModalYesBtnId').onclick = function () {
                        modal.style.display = "none";
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
                        xhttp.send(params);
                        console.log("after getting response" + xhttp.responseText);
                        var response=JSON.parse(xhttp.responseText);
                        var result=response.status;
                        UpdateTestResults(tcid,result);
                        checkIfAllCasesRan();
                        console.log(testResultDetail);
                        console.log(testResultSummary);
                        Enable();
                    }
                }
            }
            break;
    }
}
function Disable() 
{
    document.getElementById('start_icon').style.pointerEvents = "none";
    document.getElementById('next_icon').style.pointerEvents = "none";
    document.getElementById('retry_icon').style.pointerEvents = "none";
    document.getElementById('setting_icon').style.pointerEvents = "none";
    document.getElementById('reset').style.pointerEvents = "none";
    document.getElementById('view_results').style.pointerEvents = "none";
    document.getElementById('scanner_image').style.pointerEvents = "none";
}
function Enable()
{
    document.getElementById('start_icon').style.pointerEvents = "auto";
    document.getElementById('next_icon').style.pointerEvents = "auto";
    document.getElementById('retry_icon').style.pointerEvents = "auto";
    document.getElementById('setting_icon').style.pointerEvents = "auto";
    document.getElementById('reset').style.pointerEvents = "auto";
    document.getElementById('view_results').style.pointerEvents = "auto";
    document.getElementById('scanner_image').style.pointerEvents = "auto";
}

    /*var xhttp = new XMLHttpRequest();
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
}*/
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

function viewResults() {
    modal2.style.display = "block";
    var txt = "&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;" + "<b>RESULTS</b>";
    txt += "<div id='id'><table border='3' id='table'>" +
        "<tr id='tr1'><th id='th'>TID</th>" +
        "<th>TCSHORM</th>" +
        "<th id='th1'>DESC</th>" +
        "<th>LAST_STATUS</th></tr>";
    for (x in testResultDetail.DETAILS) {
        txt += "<tr id='tr'><td>" + testResultDetail.DETAILS[x].TCID + "</td>" +
            "<td>" + testResultDetail.DETAILS[x].TCSHORTNM + "</td>" +
            "<td>" + testResultDetail.DETAILS[x].DESC + "</td>" +
            "<td>" + testResultDetail.DETAILS[x].LAST_STATUS + "</td>" +
            "</tr>";
    }
    txt += "</table></div>";
    document.getElementById("show1").innerHTML = txt;
}
function Upload()
{
    modal2.style.display = "block";
    document.getElementById("uploaddata").innerHTML = "Uploading";
    var xhttp = new XMLHttpRequest();
    var url = "http://localhost:3001/ViewResults_BE";
    var request =
        {
            TestResultDetails: testResultDetail.DETAILS
        };
    var params = JSON.stringify(request);
    console.log(params);
    var params = "inputJsonStr" + "=" + params;
    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.onreadystatechange = function () {
        if ((this.readyState == 4) && (this.status == 200)) {
            console.log("after getting response" + xhttp.responseText);
            var jsonresponse=JSON.parse(this.responseText);
            document.getElementById("uploaddata").innerHTML = jsonresponse.status;
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