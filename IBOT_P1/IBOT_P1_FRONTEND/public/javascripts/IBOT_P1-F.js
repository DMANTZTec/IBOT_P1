function generateTestcases()
{
    if((document.getElementById('Board_ID').value)!="")
        document.getElementById("start").disabled = false;
    var xhttp = new XMLHttpRequest();
    var url = "http://localhost:3001/loadTestcases";
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
           // document.getElementById('td_row1_col1').innerHTML=pcbtestcases[0].TESTCASE_ID;
            //document.getElementById('td_row1_col2').innerHTML=pcbtestcases[0].TESTCASE_NM;
            //document.getElementById('td_row2_col1').innerHTML=pcbtestcases[1].TESTCASE_ID;
           // document.getElementById('td_row2_col2').innerHTML=pcbtestcases[1].TESTCASE_NM;
            var txt;

            txt += "<div id='id'><table border='1'  id='table'>" +
                "<tr><th>TID</th>" +
                "<th>TESTCASE</th>" +
                "<th>STATUS</th></tr>"
           // document.getElementById("table").innerHTML += '<div class="d" style="border:1px solid";">';
                for (x in pcbtestcases) {
                txt += "<tr id='tr'><td>" + pcbtestcases[x].TESTCASE_ID + "</td>" +
                    "<td>" + pcbtestcases[x].TESTCASE_NM +"</td><td></td></tr>";
            }
            txt += "</table></div>"
            document.getElementById("showdata").innerHTML = txt;
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
    var url = "http://localhost:3001/testing";
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
            console.log(status[0]);
                for (x in status) {
                    var table = document.getElementById("table");
                    table.rows[x].cells[2].innerText = status[x];
                }
        }
    };
    xhttp.send(params);
}
function  clear1()
{
    document.getElementById("pcbtype").value = "";
    document.getElementById("Board_ID").value = "";
    document.getElementById("success_box").value = "";
    document.getElementById("fail_box").value = "";
}

// Get the modal
var modal = document.getElementById('myModal');
// Get the button that opens the modal
var btn = document.getElementById("setting_image");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
// When the user clicks the button, open the modal
btn.onclick = function() {
    modal.style.display = "block";
}
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
