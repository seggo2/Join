const abcString = 'ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÜ'; 

let activeContact = null;

function renderContactList() {
    // getUserContacts();
    renderContactsStructure("contact-list-mobile");
    renderContactsStructure("contact-list-desktop-container");
    updateStorageData("users", USERS);
}

/**
 * function renders a contact list entry according to the contact data from the array contacts. If differentiates between desktop and mobil view
 * 
 * @param {Array} contacts 
 * @param {string} targetContainer 
 */

function renderContacts (contacts, targetId, targetContainer) {
    for (const profile of contacts) {
        let name = profile['name'];
        let email = profile['email'];
        let key = profile['contactId'];
        let color = profile.color;
        let initials = generateInitials(name);
        if(targetId == "contact-list-desktop-container"){
            targetContainer.innerHTML += createContactProfilDesktopHTML(name, email, initials, key);
            setBadgeColor(color, `badge-${key}-desktop`);
        } else {
            targetContainer.innerHTML += createContactProfilHTML(name, email, initials, key);
            setBadgeColor(color, `badge-${key}`);
        }
    }
}


/**
 * function renders the list structure with contact entry, lines, headers and buttons. It iterates the abc and and will active the render function for the corresponding letter.
 * 
 * @param {string} targetContainer 
 */
function renderContactsStructure (targetContainer) {
    const container = document.getElementById(targetContainer);
    if (container == null) {console.log("Element not found.");}
    container.innerHTML = clear();
    if (targetContainer == "contact-list-desktop-container") {
        container.innerHTML += createContactAddButtonDesktopHTML ();
    }
    for (let index = 0; index < abcString.length; index++) {
        const char = abcString[index];
        let filteredContacts = filterContactsByInitials(char);
        if (filteredContacts.length > 0) {
            container.innerHTML += createCharHeaderHTML(char);
            container.innerHTML += createLineHTML();
            renderContacts(filteredContacts,targetContainer, container);
            filteredContacts = null;
        }
    }
    addCreateContactAddButton(targetContainer, container);
}


/**
 * function renders a button to the html of the given div-element.
 * 
 * @param {string} targetId 
 * @param {element} container 
 * @returns 
 */
function addCreateContactAddButton (targetId, container) {
    if (targetId !== "contact-list-mobile") {
        return false
    }
    container.innerHTML += createContactAddButtonHtml();
    return true
}


/**
 * function renders the profil detail view of an corresponding contact. It will create a new child-element within the body.
 * 
 * @param {string} contactId 
 */
function renderContactProfil (contactId) {
    let contactObject = findContact(contactId);
    const profil = document.createElement("div");
    let elementUsed = document.getElementById("contact-view-profil-main");
    if (elementUsed){elementUsed.remove();}
    profil.id = "contact-view-profil-main";
    profil.innerHTML = createContactViewProfilHTML(contactObject.initials, contactObject.name, contactObject.email, contactObject.phone);
    document.body.appendChild(profil);
    setBadgeColor(contactObject.color,"frame-105");
}   

/**
 * functons sorts contacts array.
 * 
 * @returns boolean
 */

function sortUserContacts () {
    userContacts.sort((a,b) => {
        let fa = a.initials.toLowerCase(),
        fb = b.initials.toLowerCase();
        fa = fa[1];
        fb = fb[1];
        if (fa < fb) {
            return -1;
        }
        if (fa > fb) {
            return 1;
        }
        return 0;
    });
    return true
}

/**
 * Function fetches data from the input form and creates a new data object within the nested object USERS. It will activate further functions.
 * 
 * @param {string} target 
 */
async function addContactData (target) {
    let name = document.getElementById(`add-contact-name-${target}`).value;
    let email = document.getElementById(`add-contact-email-${target}`).value;
    let phone = document.getElementById(`add-contact-phone-${target}`).value;
    let id = generateContactID();
    let initials = generateInitials(name);
    userContacts.push({name: name, email: email, phone: phone , contactId: id, initials: initials, color: randomColor()});
    USERS[ACTIVEUSERKEY].contacts = userContacts;
    await renderContactList();
    await setActiveContact(id);
    hideDialog(`overlay-add-contact-${target}`);
    showSuccessInfo("0");
    clearAddContactData(target);
    showProfilDetails(id);
}

/**
 * Function sets active contact globally, if a contact is click for details view. It will set up an event for an event listener.
 * 
 * @param {string} contactID 
 * @returns boolean
 */
async function setActiveContact (contactID) {
    await renderContactList();
    activeContact = contactID;
    const event = await new Event('activeContactChanged');
    await document.dispatchEvent(event);
    return true
} 


/**
 * function loads needed contact data into the input fields of the opened edit contact modal version
 * 
 */
function loadEditContactData () {
    let contactObject = findContact(activeContact);
    let targetElement = "mobile";
    if (checkWindowWidth()){
        targetElement = "desktop";
    }
    let name = document.getElementById(`edit-contact-name-${targetElement}`);
    let email = document.getElementById(`edit-contact-email-${targetElement}`);
    let phone = document.getElementById(`edit-contact-phone-${targetElement}`);
    let initials = generateInitials(contactObject.name);
    let color = contactObject.color;
    changeProfilBadge(initials, color);
    name.value = contactObject.name;
    email.value = contactObject.email;
    phone.value = contactObject.phone;
}

/**
 * function fetches all values from input fields and updates USERS Object accordingly
 * 
 * @param {string} target 
 */
function saveEditedContactData (target) {
    let contactObject = findContact(activeContact);
    let nameEdited = document.getElementById(`edit-contact-name-${target}`).value;
    let emailEdited = document.getElementById(`edit-contact-email-${target}`).value;
    let phoneEdited = document.getElementById(`edit-contact-phone-${target}`).value;
    userContacts.push({name: nameEdited, email: emailEdited, phone: phoneEdited , contactId: activeContact, initials: contactObject.initials, color: contactObject.color});
    hideDialog(`overlay-edit-contact-${target}`);
    deleteContact(activeContact, false);
    USERS[ACTIVEUSERKEY].contacts = userContacts;
    renderContactList();
    showSuccessInfo("2");
}

function hideDialog (elementId) {
    const modal = document.getElementById(elementId);
    modal.close();
}

function showDialog (elementId) {
    const modal = document.getElementById(elementId);
    modal.showModal();
}

// search function returns found object
function findContact (searchId) {
    let result = findByVariable(userContacts, "contactId", searchId)
    return result
}


/**
 * function renders and creates an options modal the edit or delete the showed contact profil
 * 
 */
function showContactProfilOptions () {
    // open options dialog with animation
    const modalId = "contact-options-modal";
    let modal = document.getElementById(modalId);
    const htmlString = createContactOptionsHTML(activeContact);
    if (!modal){
       modal = renderDialog(htmlString, modalId);
    }
    modal.show();
    setTimeout(() => clickModal(), 500);
}

/**
 * Eventlistener function to close an options modal if clicked somewhere within the window but not on the option modal
 * 
 */
function clickModal() {
    document.getElementById('contact-options-modal').addEventListener('click', (event) => {
        if (document.getElementById('contact-options-modal').open) {
            if (event.target.id !== 'contact-options-box'){
                document.getElementById('contact-options-modal').close(); 
            }
        }
    });

}

/**
 * Function renders a given modal. It will appended on the body element.
 * 
 * @param {string} htmlString 
 * @param {string} modalId 
 * @returns 
 */
function renderDialog (htmlString, modalId) {
    const dialog = document.createElement('dialog');
    dialog.innerHTML = (htmlString);
    dialog.id = modalId;
    document.body.appendChild(dialog);
    return dialog
}


/**
 * functions shows different info dialogs according to the array entry. iI will show succes iinformation modals to the user.
 * 
 * @param {string} number 
 */
function showSuccessInfo(number) {
    const texts = ["Contact successfully created", "Contact successfully edited", "Contact successfully deleted", "Task succesfully deleted", , "Task successfully edited"];
    const modalId = "contact-alert";
    const htmlString = createSuccessInfoHTML();
    let modal = document.getElementById(modalId);
    if (!modal) {
       modal = renderDialog(htmlString, modalId);
    }
    document.getElementById("succes-info-text").innerHTML = texts[number];
    modal.showModal();
    setTimeout(() => modal.close(), 2000);
}

/**
 * functions returns a random string number for token purposes.
 * 
 * @returns string
 */
function generateContactID () {
    let contactID = randomString();
    return contactID 
}

/**
 * Function renders the profil view according to the screen size.
 * 
 * @param {string} contactId 
 * @returns 
 */
function showProfilDetails (contactId) {
    if (checkWindowWidth()) {
        renderContactProfilDesktop(contactId);
        return true
    }
    toggleHide("contact-view-mobile");
    renderContactProfil(contactId);
    return false
}


/**
 * function checks inner window screen size to differentiate between mobile or desktop version
 * 
 * @returns boolean
 */
function checkWindowWidth () {
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    if (vw >= 1000) {
        return true; 
    }
    return false;
}


/**
 * functions deletes contact entry. It will remove the corresponding contact list entry as well. It will show a succes information.
 * 
 * @param {string} contactID 
 * @param {boolean} bool 
 * @returns 
 */
async function deleteContact (contactID, bool) {
    if (checkWindowWidth()) {
        deleteContactDesktop(contactID, bool);
        return true
    }
    let entryIndex = userContacts.findIndex(contact => contact["contactId"] === contactID);
    let response = userContacts.splice(entryIndex,1);
    if (response == undefined) {
        console.log("Error: deletion was unsuccesful.");
        return false
    }
    USERS[ACTIVEUSERKEY].contacts = userContacts;
    await removeElemente("contact-view-profil-main");
    await renderContactList();
    await toggleHide("contact-list-background");
    if (bool){showSuccessInfo("2");}
    activeContact = null;
    return true
}

function removeElemente(elementId) {
    let element = document.getElementById(elementId);
    if (!element) { return false; }
    element.remove();
    return true
}

function getModal (elementId) {
    const modal = document.getElementById(elementId);
    return modal
}

/**
 * Functions changes profil badge color and sets name initials in it.
 * 
 * @param {string} initials 
 * @param {string} color 
 */
function changeProfilBadge(initials, color) {
    let target = "mobile";
    if (checkWindowWidth()) {
        target = "desktop";
    }
    let badge = `contact-user-symbol-badge-${target}`;
    let initialBox = document.getElementById(`contact-user-symbol-initials-${target}`);
    initialBox.innerHTML = initials;
    setBadgeColor(color, badge);
}

/**
 * Function filters USERS Object for users contact by initials
 * 
 * @param {string} initial 
 * @returns array
 */
function filterContactsByInitials(initial) {
    // Konvertiere den Input-Wert in Großbuchstaben, um die Groß-/Kleinschreibung zu ignorieren
    let targetInitial = initial.toUpperCase();
    // Verwende die filter-Methode, um die Objekte zu filtern
    let contacts = USERS[ACTIVEUSERKEY].contacts;
    let filteredContacts = contacts.filter(contact => {
      // Überprüfe, ob das Initial des Kontakts den zweiten Buchstaben mit dem Zielinitial übereinstimmt
      return contact.initials.length >= 2 && contact.initials[1].toUpperCase() === targetInitial;
    });
    return filteredContacts;
  }
 
function clear () {
    return ``;
}

