var createNew = document.getElementById('create');

createNew.onclick = function () {

    console.log("NEW CONTACT SUBMIT");

    var linkedString = document.getElementById('linked').value; //string of names separated by commas
    var linkedIDs; //array of IDs
    var idString;//string of IDs delimited by spaces
    
    if(linkedString.includes(",") !== undefined)
    {
        var dataSet = fetchData();
        linkedString = linkedString.split(",");
        
        for (var link in linkedString)
        {
            for (var data in dataSet)
            {
                if (data.name === link)
                {
                    linkedIDs.push(data.id);
                }
            }
        }
    }
    else if(linkedString !== "" && linkedString.includes(",") === undefined)
    {
        for (var data in dataSet)
            {
                if (data.name === linkedString)
                {
                    linkedIDs = data.id;
                }
            }
    }
    
    console.log("LINKED IDS: {" + linkedIDs + "}");

    try {
        if (linkedIDs.join(" ") === undefined)
        {
            idString = linkedIDs;
        } else
        {
            idString = linkedIDs.join(" ");
        }
    } catch (err) {
        console.log(err.message);
        idString = "";
    }

    var contact = {
        id: newID(),
        name: document.getElementById('name').value,
        number: document.getElementById('number').value,
        email: document.getElementById('email').value,
        address: document.getElementById('address').value,
        city: document.getElementById('city').value,
        state: document.getElementById('state').value,
        zip: document.getElementById('zip').value,
        bday: document.getElementById('bday').value,
        linked: idString
    };

    sendContact(contact);
//make API call to send data to the db
};

function sendContact(contact)
{
    //******* DUMMY URL THIS CODE WILL NOT WORK
    //awaiting legitimate GCP URL
    var requestURL = "http://http://3.22.225.249:8080/create?"
            + "id=" + contact.id
            + "&name=" + contact.name
            + "&number=" + contact.number
            + "&email=" + contact.email
            + "&address=" + contact.address
            + "&city=" + contact.city
            + "&state=" + contact.state
            + "&zip=" + contact.zip
            + "&bday=" + contact.bday
            + "&linked=" + contact.linked
            ;


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

            document.getElementById('confirm').appendChild(document.createTextNode("Contact Created"));
        } else {
            console.log("Request Error: newContact.js");
        }

    };
    sendRequest.send();
}

function newID()
{
    return '_' + Math.random().toString(36).substr(2, 9);
}