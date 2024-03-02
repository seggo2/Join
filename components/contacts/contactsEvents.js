
/**
 * function for checking window size and controlling modals
 * 
 */
function checkScreenSize() {
    // Bildschirmbreite abrufen
    const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    let modalA = document.getElementById('overlay-add-contact-mobile');
    let modalC = document.getElementById('overlay-edit-contact-mobile');
    let modalB = document.getElementById('overlay-add-contact-desktop');
    let modalD = document.getElementById('overlay-edit-contact-desktop');
    // Überprüfen, ob die Bildschirmbreite größer als 1000px ist
    if (screenWidth >= 1000) {
      // Modal_a schließen (falls es geöffnet ist)
      checkForOpenModal (modalA, modalB, false);
      checkForOpenModal(modalC, modalD, true);
    }
    if (screenWidth < 1000) {
      checkForOpenModal(modalB, modalA, false);
      checkForOpenModal(modalD, modalC, true);
    }

  }

function checkForOpenModal (modalToClose, modalToOpen, checkEditValuesNeeded) {
  if (modalToClose.open) {
    modalToClose.close();
    modalToOpen.showModal();
    if(checkEditValuesNeeded) {
      loadEditContactData();
    }
    return true
  }
  return false
}

  
  // Eventlistener hinzufügen, um die Funktion bei Änderungen der Bildschirmgröße aufzurufen
  window.addEventListener('resize', checkScreenSize);
  
  document.addEventListener('activeContactChanged', function () {
    coloringActiveContactListEntry();
  });

