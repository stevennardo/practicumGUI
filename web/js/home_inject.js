var contactTable = document.createElement('table');
contactTable.id = "contactTable";

var container = document.getElementById('container');
container.appendChild(contactTable);

window.addEventListener('load', (event) => {

    fetchData();
    var dataset = JSON.parse(localStorage.getItem('dataresponse'));

    console.log(dataset[0]);

    document.getElementById("contactTable").innerHTML = "";
    for (var x = 0; x < dataset.length; x++) {
        console.log(dataset[x].name);
        contactTable.appendChild(buildName(dataset[x]));
    }

});

//TODO: Finalize linked contacts
function buildContact(contactData) {
    var row = document.createElement('tr');
    var contactHolder = document.createElement('td');

    var contact = document.createElement('div');
    contact.innerHTML = `
<table id='newcontact'>
                
                <tr>
                    <td>Name: ${contactData.name}</td>
                </tr>
                <tr>
                    <td>Number: ${contactData.number}</td>
                </tr>
                <tr>
                    <td>Email: ${contactData.email}</td>
                </tr>
                <tr>
                    <td>Address: ${contactData.address}</td>
                </tr>
                <tr>
                    <td>City: ${contactData.city}</td>   
                </tr>
                <tr>
                    <td>State: ${contactData.state}</td>
                </tr>
                <tr>
                    <td>Zip Code: ${contactData.zip}</td>  
                </tr>
                <tr>
                    <td>Birthday: ${contactData.birthday}</td>
                </tr>
                <tr>
                    <td>Linked Contacts: ${linkedForHome(contactData.linked)}</td>
                </tr>
                <tr>
                    <td><button type="button" onclick="sendToUpdate('${contactData.id}')" id='sendToUpdate'>Update Contact</button></td>
                </tr>
                <tr>
                    <td><button type="button" onclick="deleteContact('${contactData.id}')" id='delete'>Delete Contact</button></td>
                </tr>
                <tr>
                    <td><button type="button" onclick="makeVCard('${contactData.id}')" id='vcard'>Export Contact</button></td>
                </tr>
            </table>
`;

    contactHolder.appendChild(contact);
    row.appendChild(contactHolder);
    return row;
}

function buildName(contactData) {
    var row = document.createElement('tr');
    var contactHolder = document.createElement('td');
    contactHolder.id = contactData.id;
    contactHolder.addEventListener("click", function () {
        injectContact(contactData)
    });
    var name = document.createTextNode(contactData.name);

    contactHolder.appendChild(name);
    row.appendChild(contactHolder);
    return row;
}

function injectContact(contactData) {
    var td = document.getElementById(contactData.id);
    td.innerHTML = "";
    td.appendChild(buildContact(contactData));
}

function linkedForHome(linkedID) {
    var linkedIDs = linkedID.split(" ");
    var dataset = fetchData();
    var ul = document.createElement("ul");

    try {
        for (var item in linkedIDs) {
            for (var data in dataset) {
                if (data.id === item) {
                    var li = document.createElement("li");
                    li.appendChild(document.createTextNode(data.name));
                    ul.appendChild(li);
                }
            }
        }
    } catch (e) {
        console.log("Catch: linkedForHome(), home_inject.js");
    }
    return ul;
}
