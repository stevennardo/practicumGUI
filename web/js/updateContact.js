window.onload = function () {

    let ID = localStorage.getItem('ToBeUpdated');
    console.log("Update ID: " + ID);

    fetchData();
    var dataset = JSON.parse(localStorage.getItem('dataresponse')); 
    
    console.log("Dataset: " + dataset[0].name);
    
    var updateData;

    for (var x=0; x<dataset.length; x++)
        {
            if (ID === dataset[x].id)
            {
                updateData = dataset[x];
            }
        }

    document.getElementById('name').value = updateData.name;
    document.getElementById('number').value = updateData.number;
    document.getElementById('email').value = updateData.email;
    document.getElementById('address').value = updateData.address;
    document.getElementById('city').value = updateData.city;
    document.getElementById('state').value = updateData.state;
    document.getElementById('zip').value = updateData.zip;
    document.getElementById('bday').value = updateData.bday;
    document.getElementById('linked').value = updateData.linked;
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

    try
    {
        var sendLinked = linkedIDs.join(" ");
    }catch (e)
    {
        var sendLinked = "";
    }

    var contact = {
        id: localStorage.getItem('ToBeUpdated'),
        name: document.getElementById('name').value,
        number: document.getElementById('number').value,
        email: document.getElementById('email').value,
        address: document.getElementById('address').value,
        city: document.getElementById('city').value,
        state: document.getElementById('state').value,
        zip: document.getElementById('zip').value,
        bday: document.getElementById('bday').value,
        linked: sendLinked
    };

    updateContactSend(contact);
//make API call to send data to the db
}
;

function updateContactSend(contact)
{
    //******* DUMMY URL THIS CODE WILL NOT WORK
    //awaiting legitimate GCP URL
    var requestURL = "http://3.22.225.249:8080/update?"
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
            document.getElementById('confirm').appendChild(document.createTextNode("Contact Updated"));
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