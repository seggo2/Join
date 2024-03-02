function createContactProfilHTML (name, email, badgeInitials, contactID) {
    return /*html*/`
        <div id="${contactID}" class="contact-list-profile-mobile pointer btn-hover-grey-fill" onclick="showProfilDetails('${contactID}'); setActiveContact('${contactID}');">
            <div class="contact-list-profile-badge-box" id="badge-${contactID}-box">
                    <div class="ellipse-profil-badge" id="badge-${contactID}">
                        <span id="badge-${contactID}-span">${badgeInitials}</span>
                    </div>
                </div>
                <div class="contact-name-box">
                    <span class="contact-name" id="contact-${contactID}-name">${name}</span>
                    <span class="contact-email" id="contact-${contactID}-email">${email}</span>
                </div>
            </div>
        </div>
       
    `
}

function createContactProfilDesktopHTML (name, email, badgeInitials, contactID) {
    return /*html*/`
        <div id="${contactID}-desktop" class="contact-list-profile-mobile pointer btn-hover-grey-fill" onclick="showProfilDetails('${contactID}'); setActiveContact('${contactID}');">
            <div class="contact-list-profile-badge-box" id="badge-${contactID}-box-desktop">
                    <div class="ellipse-profil-badge" id="badge-${contactID}-desktop">
                        <span id="badge-${contactID}-span-desktop">${badgeInitials}</span>
                    </div>
                </div>
                <div class="contact-name-box">
                    <span class="contact-name" id="contact-${contactID}-name-desktop">${name}</span>
                    <span class="contact-email" id="contact-${contactID}-email">${email}</span>
                </div>
            </div>
        </div>
       
    `
}

function createSuccessInfoHTML () {
    return  /*html*/`
            <div class="alert d-flex align-items-center justify-content-center" >
                <span id="succes-info-text" class="fw-4 fs-2"></span>
            </div>  
    `
}

function createLineHTML () {
    return /*html*/`
        <div class="line">
            <svg xmlns="http://www.w3.org/2000/svg" width="354" height="2" viewBox="0 0 354 2" fill="none">
                <path d="M1 1H353" stroke="#D1D1D1" stroke-linecap="round"/>
            </svg>
        </div>
        
    `
}

function createCharHeaderHTML (char) {
    return /*html*/`
        <span class="contact-list-header-char-container">${char}</span>
    `
}

function createContactAddButtonHtml () {
  return  /*html*/`
        <div id="contact-list-add-button" onclick="showDialog('overlay-add-contact-mobile');" >
            <img src="/assets/img/contacts/person_add.svg" alt="add person button">
        </div>
    `
}

function createContactViewProfilHTML (contactInitials, contactName, contactEmail, contactPhone) {
    return /*html*/`
            <section class="d-flex flex-row justify-content-space-between flex-start px-16" id="contact-view-top-section">
            <div class="d-flex flex-column g-16" id="frame-207">
                <div class="d-flex flex-column g-8" id="frame-173">
                    <span class="fw-7 fs-4 black">Contacts</span>
                    <span class="fw-4 fs-2 black">Better with a team!</span>
                </div>
                <div class="bw-3 w-9 bc-lightblue" id="addcontact-top-text-Vector"></div>
            </div>
            
            <div id="contact-arrow-box" class="pointer" onclick="toggleHide('contact-view-mobile'); renderContactList(); removeElemente('contact-view-profil-main');">
                <img src="/assets/img/contacts/arrow-left-line.svg" alt="Arrow left">
            </div>
        </section>
        <section id="contact-view-middle-section" class="d-flex flex-column g-21 ms-16">
                <div class="d-flex flex-row base-line g-20">
                    <div id="frame-105" class="d-flex justify-content-center align-items-center">
                        <span class="" id="contact-view-symbol-initials">${contactInitials}</span>
                    </div>
                    <span id="frame-81">${contactName}</span>  
                </div>
                <span class="fs-2 fw-4">Contact Information</span>
                <div id="frame-101" class="d-flex flex-column space-evenly flex-start g-15">
                    <span class="fw-7 fs-1">Email</span>
                    <a id="contact-profil-email" class="contact-view-email" href="mailto:${contactEmail}">${contactEmail}</a>
                    <span class="fw-7 fs-1">Phone</span>
                    <span id="contact-profil-phone">${contactPhone}</span>
                </div>
    </section>
    <section id="contact-view-bottom-section" class="d-flex flex-end grow-1 px-16">
        <div id="menu-contact-options" onclick="showContactProfilOptions();">
            <img src="/assets/img/contacts/more_vert.svg" alt="Options">
        </div>
    </section>
    `
}

function createContactOptionsHTML (activeContact) {
    return /*html*/`
    <div id="contact-options-box" class="d-flex justify-content-center flex-column align-items-center">
    <div class="d-flex flex-column flex-start">
        <div id="contact-opitons-edit" class="d-flex flex-row justify-content-center g-8  pointer" onclick="showDialog('overlay-edit-contact-mobile'); hideDialog('contact-options-modal');loadEditContactData()";">
            <div class="symbol-frame">
                <img src="/assets/img/contacts/edit.svg" alt="Editieren">
            </div>
            <span class="fw-4 fs-1">Edit</span>
        </div>
        <div id="contact-options-delete" class="d-flex flex-row justify-content-center g-8 pointer" onclick="deleteContact('${activeContact}', true); hideDialog('contact-options-modal');">
            <div class="symbol-frame">
                <img src="/assets/img/contacts/delete.svg" alt="Löschen">
            </div>
            <span class="fw-4 fs-1">Delete</span>
        </div>
    </div>
</div>
    `
}

function createContactAddButtonDesktopHTML () {

    return /*html*/`
        <div id="desktop-contact-list-add-button-box">
            <div id="desktop-contact-list-add-button" onclick="showDialog('overlay-add-contact-desktop');" class="btn-hover-blue-fill">
                    <b>Add new contact</b> <img src="/assets/img/contacts/person_add.svg" alt="add person button">
            </div>
        </div>
        
    `
}

function createContactProfilViewDesktopHTML (contactInitials, contactName, contactEmail, contactPhone) {
    return /*html*/`
        <div id="contact-view-middle-section" class="d-flex flex-column g-21 ms-16">
            <div class="d-flex flex-row base-line g-20">
                <div id="frame-105-desktop" class="d-flex justify-content-center align-items-center">
                    <span class="" id="contact-view-symbol-initials">${contactInitials}</span>
                </div>
                    <div id="contact-view-profil-name-box" class="d-flex flex-column">
                        <span id="frame-81">${contactName}</span>
                        <div id="contact-view-options-container">
                            <div id="contact-opitons-edit" class="d-flex flex-row justify-content-center g-8  pointer" onclick="showDialog('overlay-edit-contact-desktop'); loadEditContactData()";">
                                <div class="symbol-frame">
                                    <img src="/assets/img/contacts/edit.svg" alt="Editieren">
                                </div>
                                <span class="fw-4 fs-1">Edit</span>
                                </div>
                            <div id="contact-options-delete" class="d-flex flex-row justify-content-center g-8 pointer" onclick="deleteContact('${activeContact}', true); deleteContactProfilView();">
                                <div class="symbol-frame">
                                <img src="/assets/img/contacts/delete.svg" alt="Löschen">
                                </div>
                                <span class="fw-4 fs-1">Delete</span>
                            </div>
                        </div>
                    </div>
            </div>
            <span class="fs-2 fw-4">Contact Information</span>
            <div id="frame-101" class="d-flex flex-column space-evenly flex-start g-15">
                <span class="fw-7 fs-1">Email</span>
                <a id="contact-profil-email" class="contact-view-email" href="mailto:${contactEmail}">${contactEmail}</a>
                <span class="fw-7 fs-1">Phone</span>
                <span id="contact-profil-phone">${contactPhone}</span>
            </div>
        </div>
    `
}