function deleteContact(id)
{
    var requestURL = "http://localhost:8080/delete/?id=" + id;

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
            console.log(this.response);
        } else {
            console.log("Request Error: delete.js");
        }

    };
    sendRequest.send();
}