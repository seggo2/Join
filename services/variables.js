let USERS = {};

let ACTIVEUSERKEY = null;

let userContacts = []; 
let userTasks;
let localUserTasks = [];
let localGuestTasks = [];

// Variable saves the number of active tasks within the board section
let BOARDTASKS = null;

/**
 * Functions loads / sets from USERS all important variables for further use
 * 
 */
async function getVariables () {
    ACTIVEUSERKEY = getLocalStorage("activeUser");
    let buffer = await getStorageData("users", USERS);
    Object.assign(USERS, buffer);
    if ( !("tasks" in USERS[ACTIVEUSERKEY]) ) {
      USERS[ACTIVEUSERKEY].tasks = {};
    }

    if ( !("contacts" in USERS[ACTIVEUSERKEY]) ) {
      USERS[ACTIVEUSERKEY].contacts = [];
    } 
    userContacts = USERS[ACTIVEUSERKEY].contacts; 
    userTasks = USERS[ACTIVEUSERKEY].tasks;
    guestTasks = USERS["guest"].tasks;
}
    
function setVariables () {
  return true
}

/**
 * This function gets data from local storage
 * 
 * 
 */ 
async function getTasksFromLocalStorage() { 
  localGuestTasks = await getLocalStorage("localGuestTasks");
  if (localGuestTasks == null ) {
    return false;
  }
  Object.assign(USERS["guest"].tasks, localGuestTasks);
}