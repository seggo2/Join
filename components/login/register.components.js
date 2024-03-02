let userData = {};

/**
 * is the onload function 
 */
async function init() {
     await loadUsers();
}

/**
 * overall register function
 */
async function register() {
     let name = document.getElementById('Name').value;
     let email = document.getElementById('mail').value;
     let password = document.getElementById('password').value;
     let passwordConfirm = document.getElementById('passwordConfirm').value;
     let key = Math.floor((Math.random() * 1000000) + 1);
     let notsame = document.getElementById('notsame');
     let initials = generateInitials(name);
     if (findUserByEmail(email)) {
          notsame.innerHTML = 'email is already in use';
          notsame.classList.remove('d-none');
     } else {
          if (checkPassword(password, passwordConfirm)) {
               userData = { 'userData': { key: key, name: name, email: email, password: password, initials: initials, failedAttemped: true } };
               USERS[key] = userData;
               USERS[key].contacts = [];
               USERS[key].tasks = {};
               addStartingData(key);
               // TODO insert pre join pre contact and pre tasks function here - addStartingData () 
               updateStorageData('users', USERS);
               await popup();
          } else {
               notsame.innerHTML = 'password are not the same';
               notsame.classList.remove('d-none');
          }
     }
}

/**
 * checks if the email is already been taken 
 * @param {string} email 
 * @returns true
 */
function findUserByEmail(email) {
     if (USERS.length == 0) {
          console.log('ist nicht existent')
     } else {
          let usersArray = Object.values(USERS);
          let foundUser = usersArray.find(user =>
               user.userData.email == email)
          return foundUser;
     }

}

/**
 * checks if the password and confirm password are the same
 * @param {string} password 
 * @param {string} passwordConfirm 
 * @returns true
 */
function checkPassword(password, passwordConfirm) {//check if both passwords are the same
     return password == passwordConfirm;
}

/**
 * is the popup function after you are registerd
 */
function popup() {
     let popupScreen = document.getElementById('popup');
     popupScreen.classList.remove('d-none');
     setTimeout(() => {
          openLogin();
     }, 2000);
}

/**
 * leads you to login html
 */
function openLogin() {
     window.location.href = '/components/login/login.html';
}

/**
 * /from register back to login html
 */
function back() {
     window.location.href = '/components/login/login.html';
}

/**
 * password vissibility and changes the img
 */
function passwordVisibleRegister() {//changes the lock img and the passwort visibility
     let password = document.getElementById('password');
     let passwordConfirm = document.getElementById('passwordConfirm');

     if (password.type == 'password') {
          password.type = 'text';
          passwordConfirm.type = 'text';
          password.style.backgroundImage = "url('/assets/img/—Pngtree—cartoon unlock icon_4438287.png')";
          passwordConfirm.style.backgroundImage = "url('/assets/img/—Pngtree—cartoon unlock icon_4438287.png')";
     } else {
          password.type = 'password';
          passwordConfirm.type = 'password';
          password.style.backgroundImage = "url('/assets/img/lock.jpg')";
          passwordConfirm.style.backgroundImage = "url('/assets/img/lock.jpg')";
     }
}

function addStartingData (key) {
     PreSetContactOne = { "name": "JOIN Servicedesk", "email": "service@join.com", "phone": "+0800123123", "contactId": "9876!oek", "initials": "SD", "color": "812731"};   
     PreSetContacttwo = { "name": "JOIN Product Genius", "email": "genius@join.com", "phone": "+08001234567", "contactId": "987?ert", "initials": "PG", "color": "3e59c2"};
     tasks = {
          rIyVoCsvw4:
          {
               "dateCreated": 1705769521351,
               "id": "rIyVoCsvw4",
               "title": "Überprüfe die Einsteigertips",
               "description": "Einsteigertips findest du HIER",
               "prio": "medium",
               "date": "2024-01-31",
               "status": "todo",
               "category": "User Story",
               "user": [],
               "subtasks": {
                   "subtaskContent": [],
                   "subtaskStatus": []
               },
               "status": "todo"
           },
           cUeUmyhTLm:
           {
               "dateCreated": 1705827706266,
               "id": "cUeUmyhTLm",
               "title": "Start JOIN Tutorial",
               "description": "The tutorial can be found HERE",
               "prio": "medium",
               "date": "2024-01-23",
               "category": "Technical Task",
               "user": [],
               "subtasks": {
                   "subtaskContent": [],
                   "subtaskStatus": []
               },
               "status": "feedback"
           }
     }
     
     USERS[key].contacts.push(PreSetContactOne);
     USERS[key].contacts.push(PreSetContacttwo);
     USERS[key].tasks = tasks; 
}