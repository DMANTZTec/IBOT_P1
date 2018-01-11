function generateTestcases()
{
    if((document.getElementById('Board_ID').value)!="")
        document.getElementById("start").disabled = false;
    var xhttp = new XMLHttpRequest();
    var url = "http://localhost:3001/pcbtype";
    var pcbtype = {pcbtype: document.getElementById("pcbtype").value};
    var params = JSON.stringify(pcbtype);
    console.log(params);
    var params = "inputJsonStr" + "=" + params;
    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.onreadystatechange = function ()
    {
        if ((this.readyState == 4) && (this.status == 200))
        {
            console.log("after getting response" + xhttp.responseText);
            var jsonresponse = JSON.parse(this.responseText);
            var pcbtestcases = jsonresponse.PCB_TESTCASES;
            console.log(pcbtestcases);
            console.log(pcbtestcases[0].TESTCASE_ID);
            document.getElementById('td_row1_col1').innerHTML=pcbtestcases[0].TESTCASE_ID;
            document.getElementById('td_row1_col2').innerHTML=pcbtestcases[0].TESTCASE_NM;
            document.getElementById('td_row2_col1').innerHTML=pcbtestcases[1].TESTCASE_ID;
            document.getElementById('td_row2_col2').innerHTML=pcbtestcases[1].TESTCASE_NM;
        }
    };
    xhttp.send(params);
}
function scanner()
{
    if((document.getElementById('pcbtype').value)!="")
    document.getElementById("start").disabled = false;
    var xhttp = new XMLHttpRequest();
    var url = "http://localhost:3001/barcode";
    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.onreadystatechange = function ()
    {
        if ((this.readyState == 4) && (this.status == 200))
        {
            console.log("after getting response" + xhttp.responseText);
            var barcode=JSON.parse(this.responseText);
            document.getElementById("Board_ID").value=barcode.barcode;
        }
    };
    xhttp.send();
}
function start()
{
    var xhttp = new XMLHttpRequest();
    var url = "http://localhost:3001/pcb1_typecases";
    var pcbtype =
        {
            pcbtype: document.getElementById("pcbtype").value
        };
    var params = JSON.stringify(pcbtype);
    console.log(params);
    var params = "inputJsonStr" + "=" + params;
    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.onreadystatechange = function ()
    {
        if ((this.readyState == 4) && (this.status == 200))
        {
            console.log("after getting response" + xhttp.responseText);
             var status = JSON.parse(this.responseText);
             console.log(status);

            document.getElementById('td_row1_col3').innerHTML = status[0];


            document.getElementById('td_row2_col3').innerHTML = status[1];

        }
    };
    xhttp.send(params);
}
function  clear()
{
    document.getElementById("clear").reset();
}
/*function enable() {
    if (document.getElementById("pcbtype").value != "" && document.getElementById("Board_ID").value != "") {

        document.getElementById("start").disabled = "false";
    }
    else
        {
            document.getElementById("start").disabled = "true";
        }
}*/
