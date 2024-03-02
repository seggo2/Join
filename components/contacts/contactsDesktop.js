
function renderContactProfilDesktop (contactId) {
    let contactObject = findContact(contactId);
    const profil = document.createElement("div");
    let elementUsed = document.getElementById("contact-profil-desktop-container");
    if (elementUsed){elementUsed.remove();}
    profil.id = "contact-profil-desktop-container";
    profil.innerHTML = createContactProfilViewDesktopHTML(contactObject.initials, contactObject.name, contactObject.email, contactObject.phone);
    document.getElementById("contact-profil-desktop").appendChild(profil);
    setBadgeColor(contactObject.color,"frame-105-desktop");
}   

function deleteContactDesktop (contactID, bool) {
    let entryIndex = userContacts.findIndex(contact => contact["contactId"] === contactID);
    let response = userContacts.splice(entryIndex,1);
    if (response == undefined) {
        console.log("Error: deletion was unsuccesful.");
        return false
    }
    USERS[ACTIVEUSERKEY].contacts = userContacts;
    removeElemente("contact-profil-desktop-container");
    renderContactList();
    if (bool){showSuccessInfo("2");}
    activeContact = null;
}

function coloringActiveContactListEntry() {
    const divElementMobile = document.getElementById(activeContact);
    const divElementDesktop = document.getElementById(`${activeContact}-desktop`);
    divElementMobile.style.backgroundColor = `#2A3647`;
    document.getElementById(`contact-${activeContact}-name`).style.color = 'white';
    divElementDesktop.style.backgroundColor = `#2A3647`;
    document.getElementById(`contact-${activeContact}-name-desktop`).style.color = 'white';
}

function clearAddContactData (target) {
    document.getElementById(`add-contact-name-${target}`).value = '';
    document.getElementById(`add-contact-email-${target}`).value = '';
    document.getElementById(`add-contact-phone-${target}`).value = '';
    return true
}