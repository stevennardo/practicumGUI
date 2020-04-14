function sendToUpdate(id)
{
    sessionStorage.setItem('ToBeUpdated', id);
    window.location.href = "updateContact.html";
}