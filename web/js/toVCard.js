function makeVCard(id) {
    var contact;
    var dataset = JSON.parse(localStorage.getItem('dataresponse'));

    for (var x = 0; x < dataset.length; x++) {
        if (id === dataset[x].id) {
            contact = dataset[x];
        }
    }

    require(['vcards-js'], function () {
        //package is now loaded.

        var vCardsJS = require('vcards-js');

        //create a new vCard
        var vCard = vCardsJS();

        //set properties
        vCard.uid = contact.id;
        vCard.firstName = contact.name;
        vCard.cellPhone = contact.number;
        vCard.email = contact.email;
        vCard.homeAddress.street = contact.address;
        vCard.homeAddress.city = contact.city;
        vCard.homeAddress.stateProvince = contact.state;
        vCard.homeAddress.postalCode = contact.zip;

        var nameWOSpace = (contact.name).replace(/\s+/g, '');
        //save to file
        vCard.saveToFile('./' + nameWOSpace + '.vcf');
    });
}