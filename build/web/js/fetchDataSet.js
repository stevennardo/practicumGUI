function fetch()
{
    var requestURL = "http://localhost:8080/fetch";

//send API call of the user (query)
    var sendRequest = new XMLHttpRequest();

// Open a new connection, using the GET request on the URL endpoint
    console.log("Before Open");
    try {
        sendRequest.open('GET', requestURL, true);
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
            var dataresponse = this.response;
            console.log(dataresponse);
            if (dataresponse[0].name === "DNE")
            {
                return "DNE";
            } else
            {
                return JSON.parse(dataresponse);
            }

        } else {
            console.log("Request Error: newContact.js");
        }

    };
    sendRequest.send();
}