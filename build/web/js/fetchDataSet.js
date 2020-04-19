console.log("FETCHDATASET.js HAS BEEN IMPORTED");

function fetchData()
{
    var requestURL = "http://3.22.225.249:8080/fetch";

//send API call of the user (query)
    var sendRequest = new XMLHttpRequest();

// Open a new connection, using the GET request on the URL endpoint
    console.log("Before Open FETCH");
    try {
        sendRequest.open('GET', requestURL, false);
        console.log("Opened");
    } catch (e)
    {
        console.log(e);
    }

    console.log("Before On Load");
    sendRequest.onload = function () {
        console.log("On Load");

        if (sendRequest.status >= 200 && sendRequest.status < 400)
        {
            var dataresponse = JSON.parse(this.response);;
            console.log(dataresponse);
            sessionStorage.setItem('dataresponse', this.response);
            //return dataresponse;

        } else {
            console.log("Request Error: fetchDataSet.js");
        }

    };
    sendRequest.send();
}