function sendToUpdate(id)
{
    localStorage.setItem('ToBeUpdated', id);
    window.location.href = "updateContact.html";
}