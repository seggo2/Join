

/**secuirity function if somone typed to often something wrong
 * 
 * @param {number} key 
 * @param {string} email 
 * @param {variable} message 
 */
function securityCheck(key, email, message) {
    if (checkKey(key, email)) {
        var objectTime = checkKey(key, email);
    }
    let timepassed = new Date().getTime() - objectTime;
    message.classList.remove('d-none');
    message.innerHTML = `you have to wait ${timeout / 1000} Seconds!`;
    if (timepassed > timeout) {
        loginTrys = USERS[key].userData.timepassed.logintrys = 2;
        timeTrue(key, email);
        message.innerHTML = `you can try again `;
        timeout *= 2
    } else {
        if (timeObject(email)) {
            setTime(key, email);
        } else {
            message.innerHTML = `your email or Password is wrong you have to wait ${timeout / 1000} seconds`;
        }
    }
}


/**
 * secuirity checking things
 * @param {number} key 
 * @param {string} email 
 * @returns 
 */
function checkKey(key, email) {
    if (USERS[key]) {
        if (USERS[key].userData.timepassed) {
            if (USERS[key].userData.timepassed.time == null) {
                setTime(key, email)
            } else {
                var objectTime = USERS[key].userData.timepassed.time;
                return objectTime
            }
        }
    }
}

/**
 * checks if failed attemped is true or false
 * @param {string} email 
 * @returns true or false
 */

function timeObject(email) {
    let usersArray = Object.values(USERS);
    let foundUser = usersArray.find(user =>
        user.userData.email == email)

    if (foundUser) {
        let failedTime = foundUser.userData.failedAttemped == true;
        return failedTime;
    } else {
        console.log('not found')
    }
}

/**
 * sets time mark in object array when he failes to login twice
 * @param {number} key 
 * @param {string} email 
 */
async function setTime(key, email) {
    let time = new Date().getTime();
    let usersArray = Object.values(USERS);
    let founduser = usersArray.find(user =>
        user.userData.email == email)
    if (founduser) {
        founduser.userData.failedAttemped = false;
    }

    if (key) {
        USERS[key].userData.timepassed = { 'time': time, 'logintrys': 0 };
        await updateStorageData('users', (USERS))
    } else {
        console.log('not found')

    }
}

/**sets in storage that the person who failed has waiten his time 
 * 
 * @param {number} key 
 * @param {string} email 
 */
async function timeTrue(key, email) {
    let usersArray = Object.values(USERS);
    let finduser = usersArray.find(user =>
        user.userData.email == email)
    if (finduser) {
        USERS[key].userData.failedAttemped = true;
        USERS[key].userData.timepassed.time = null;
        await updateStorageData('users', (USERS))
    }
}