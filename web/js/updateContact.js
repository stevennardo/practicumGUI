window.onload = function () {

    let ID = sessionStorage.getItem('ToBeUpdated');
    var dataset = fetchData();
    var updateData;

    if (dataset === "DNE")
    {
        document.getElementById('confirm').innerHTML = "No contacts currently exist.";
    } else
    {
        for (var item in dataset)
        {
            if (ID === item.id)
            {
                updateData = item;
            }
        }
    }

    document.getElementById('name').value = item.name;
    document.getElementById('number').value = item.number;
    document.getElementById('email').value = item.email;
    document.getElementById('address').value = item.address;
    document.getElementById('city').value = item.city;
    document.getElementById('state').value = item.state;
    document.getElementById('zip').value = item.zip;
    document.getElementById('bday').value = item.bday;
    document.getElementById('linked').value = item.linked;
};

function updateContact() {

    console.log("UPDATE CONTACT SUBMIT");

    var linkedString = document.getElementById('bday').value;
    linkedString = linkedString.split(",");
    var linkedIDs;

    var dataSet = fetchData();
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

    var contact = {
        id: sessionStorage.getItem('ToBeUpdated'),
        name: document.getElementById('name').value,
        number: document.getElementById('number').value,
        email: document.getElementById('email').value,
        address: document.getElementById('address').value,
        city: document.getElementById('city').value,
        state: document.getElementById('state').value,
        zip: document.getElementById('zip').value,
        bday: document.getElementById('bday').value,
        linked: linkedIDs.join(" ")
    };

    updateContact(contact);
//make API call to send data to the db
}
;

function updateContact(contact)
{
    //******* DUMMY URL THIS CODE WILL NOT WORK
    //awaiting legitimate GCP URL
    var requestURL = "http://localhost:8080/update/?"
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
            document.getElementById('confirm').appendChild(document.createTextNode("Contact Deleted"));
        } else {
            console.log("Request Error: updateContact.js");
        }

    };
    sendRequest.send();
}

function getID()
{
    var id = localStorage.getItem("id");
    if (id)
    {
        return id;
    } else {
        localStorage.setItem("id", '_' + Math.random().toString(36).substr(2, 9));
        return localStorage.getItem("id");
    }
}