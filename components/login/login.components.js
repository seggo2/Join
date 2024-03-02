let loginTrys = 2;
let timeout = 15000;
/**
 * is the onload function 
 */
async function init() {
     // function that erases / deletes the localstorage
     setLocalStorage("localUserTasks", " ");
     setLocalStorage("activeUser", " ");
     await loadUsers();
}

/**
 * function loads the user object from the backend
 */
async function loadUsers() {
     try {
          USERS = await getStorageData('users');
     } catch (error) {
          console.log(error.message);
     }
}

/**
 * login and secuirity check function
 */
async function login() {
     let email = document.getElementById('mail').value;
     let password = document.getElementById('password').value;
     let message = document.getElementById('message');
     if (findKey(email)) {
          var key = findKey(email)
          timeOutCheck(key)
     }
     if (loginTrys == 0) {
          securityCheck(key, email, message)
     } else {
          if (checkEmailLogin(email)) {
               if (checkPasswordLogin(password)) {
                    ACTIVEUSERKEY = key;
                    setLocalStorage("activeUser", ACTIVEUSERKEY);
                    loadingScreen();
                    window.location.href = '/index.html';
               } else {
                   TimePassedData(key,message)
               }
          } else {
               CheckMailFailed(message,key)
          }
     }
}

function loadingScreen() {
     let element=document.getElementById('loading');
     element.classList.toggle("d-none")
}

/**
 * shortening the login function
 * @param {number} key 
 * @param {string} message 
 */
function TimePassedData(key,message) {
     inCorrect(message)
     if (USERS[key]) {
          if (USERS[key].userData.timepassed) {
               keySettStrorage(key)
          } else {
               loginTrys -= 1
          }
     } else {
          loginTrys -= 1
     }
}

/**
 * shortening the login function
 * @param {string} message 
 * @param {number} key 
 */
function CheckMailFailed(message,key) {
     inCorrect(message)
     if (USERS[key]) {
          if (user[key].userData.timepassed) {
               keySettStrorage(key)
          } else {
               loginTrys -= 1
          }
     } else {
          loginTrys -= 1
     }
}

/**
 * div container message innder html
 * @param {string} message 
 */
function inCorrect(message) {
     message.innerHTML = 'Email or password is Incorrect';
     message.classList.remove('d-none');
}

/**
 * setting login trys frim storage
 * @param {number} key 
 */
function timeOutCheck(key) {
     if (USERS[key].userData.timepassed) {
          if (USERS[key].userData.timepassed.logintrys > -1) {
               loginTrys = USERS[key].userData.timepassed.logintrys;
          }
     }
}

/**
 * //check if email is already in user
 * @param {string} email 
 * @returns the person with the email is founded
 */
function checkEmailLogin(email) {
     if (USERS.length == 0) {
          console.log('ist nicht existent')

     } else {
          let usersArray = Object.values(USERS);
          let foundUser = usersArray.find(user =>
               user.userData.email === email)
          return foundUser;
     }
}

/**
 * check if  password is in user
 * @param {string} password 
 * @returns  the person with the password 
 */
function checkPasswordLogin(password) {
     let usersArray = Object.values(USERS);
     let foundUser = usersArray.find(user =>
          user.userData.password === password)
     return foundUser;

}

/**
 * from login to register html
 */
function signUp() {
     window.location.href = '/components/login/register.html';
}

/**
 * changes the lock img and the passwort vissibility
 */
function passwordVisible() {
     let password = document.getElementById('password');
     if (password.type == 'password') {
          password.type = 'text';
          password.style.backgroundImage = "url('/assets/img/—Pngtree—cartoon unlock icon_4438287.png')";
     } else {
          password.type = 'password';
          password.style.backgroundImage = "url('/assets/img/lock.jpg')";
     }
}

/**
 * this function is to find the user who logs in and filter out his specific unique key
 * 
 * @param {string} email email from the person who trys to log in
 * @returns key
 */
function findKey(email) {
     let usersArray = Object.values(USERS);
     let foundUser = usersArray.find(user =>
          user.userData.email == email)

     if (foundUser) {
          let key = foundUser.userData.key;
          return key;
     } else {
          console.log('not found')
     }
}
/**
 * sets storage with new data
 * @param {number} key 
 */
async function keySettStrorage(key) {
     await updateStorageData('users', (USERS[key].userData.timepassed.logintrys -= 1));
}

async function guestLogin() {
     contacts = [
          { "name": "Benedikt Ziegler", "email": "benediktz@gmail.com", "phone": "+1234567", "contactId": "98765abc", "initials": "BZ", "color": "812731" },
          { "name": "Anton Mayer", "email": "antom@gmail.com", "phone": "+1234567", "contactId": "12345abc", "initials": "AM", "color": "3e59c2" },
          { "name": "Helena Eissele", "email": "helenae@gmail.com", "phone": "+1234567", "contactId": "97345oiu", "initials": "HE", "color": "2b3430" },
          { "name": "Izak Abraham", "email": "izaka@gmail.com", "phone": "+1234567", "contactId": "12367oiu", "initials": "IA", "color": "907ee1" },
          { "name": "Anja Schulz", "email": "anjas@gmail.com", "phone": "+1234567", "contactId": "12345ghf", "initials": "AS", "color": "3e59c2" },
          { "name": "David Eisenberg", "email": "davide@gmail.com", "phone": "+1234567", "contactId": "12345oiu", "initials": "DE", "color": "4f98ce" }
     ];
     userData = { key: 0, name: 'Guest', email: 'GuestTest@hotmail.de', password: 'password', initials: 'G', failedAttemped: true };
     // initalize entry with key guest and empty value as an object
     USERS = await getStorageData('users', USERS);
     if (!("guest" in USERS)) {
          USERS["guest"] = {};
          USERS["guest"]["userData"] = userData;
          USERS["guest"]["contacts"] = contacts;
          await updateStorageData('users', USERS);
     }
     ACTIVEUSERKEY = "guest";
     await setLocalStorage("activeUser", ACTIVEUSERKEY);
     loadingScreen();
     window.location.href = '/index.html';
}