var contactTable = document.createElement('table');
contactTable.id = "contactTable";

var container = document.getElementById('container');
container.appendChild(contactTable);

window.onload = function () {

    var dataset = fetch();
    if (dataset === "DNE")
    {
        contactTable.innerHTML = "No contacts currently exist.";
    } else
    {
        contactTable.innerHTML = "";
        for (var item in dataset)
        {
            buildContact(item);
        }
    }
};

//TODO: Finalize linked contacts
function buildContact(contactData)
{
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
                    <td>Linked Contacts: ${contactData.linked}</td>
                </tr>
                <tr>
                    <td><button type="button" onclick="sendToUpdate(${contactData.id})" id='sendToUpdate'>Update Contact</button></td>
                </tr>
                <tr>
                    <td><button type="button" onclick="deleteContact(${contactData.id})" id='delete'>Delete Contact</button></td>
                </tr>
            </table>
`;

    contactHolder.appendChild(contact);
    row.appendChild(contactHolder);
    contactTable.appendChild(row);
}

