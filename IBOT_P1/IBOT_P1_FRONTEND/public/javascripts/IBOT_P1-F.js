function start() {
    var box = document.getElementById("pcbtype").value;
    if (box == "") {
        document.getElementById("error").innerHTML = "Please select pcbtype";
    }
    else {
        var xhttp = new XMLHttpRequest();
        var url = "http://192.168.100.6:3000/pcbtype";
        var pcbtype = {
            pcbtype: document.getElementById("pcbtype").value,

        };
        var params = JSON.stringify(pcbtype);
        console.log(params);
        var params = "inputJsonStr" + "=" + params;
        xhttp.open("POST", url, true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.onreadystatechange = function () {
            if ((this.readyState == 4) && (this.status == 200)) {
                console.log("after getting response" + xhttp.responseText);
                var jsonresponse = JSON.parse(this.responseText);
            }

        };
        xhttp.send(params);
    }
}

function  clear()
{

}
