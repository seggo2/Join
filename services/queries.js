const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';
const STORAGE_TOKEN = 'LMBAS4F9WBPBDZFK8259KHJQX6G2KD62SQOU7VKS';

/**
 * The function gets the JSON data from the backend storage.
 * 
 * @param {string} key 
 * @returns 
 */
async function getStorageData (key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    let package = await fetch(url).then(res => res.json()).then(res => {
        if (res.data) { 
            return res.data.value;
        } throw `Could not find data with key "${key}".`;
    }); 
    return JSON.parse(package)
}

function setObjectToJSON(objectJSON, Object) {
    objectJSON = JSON.stringify(Object)
}

/**
 * The function stores JSON data as a string into the backend storage with a specific token.
 * 
 * @param {string} key 
 * @param {object} value 
 * @returns 
 */
async function setStorageData (key, value) {
    const payload = {key, value, token: STORAGE_TOKEN};
    try {
        return await fetch(STORAGE_URL, writeServer("POST", payload))
        .then(getResponse);
    }
    catch(err) {
        console.error(`${err.message}`);
    }
}

/**
 * function handles response and changes the data into JSON format.
 * 
 * @param {response} response 
 * @returns 
 */
function getResponse(response) {
    return response.json();
}

/**
 * function handles the database writing information. Generates and returns the http request for the fetch call.
 * 
 * @param {string} action 
 * @param {object} data 
 * @returns 
 */
function writeServer(action, data) {
    return {method: action, body: JSON.stringify(data)};
}

/**
 * function saves an array with a specific key into the local storage a JSON string
 * 
 * @param {string} key 
 * @param {array} array 
 */
function setLocalStorage (key, array) {
    localStorage.setItem(key, JSON.stringify(array));
  }
  
  /**
   * functions get the JSON string from the local storage with the specific key and returns it
   * 
   * @param {*} key 
   * @returns 
   */
  function getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  function updateStorageData(key, object) {
    // get storage data
    // save it into a buffer variable
    // add whatever needs to be added into the buffer
    // set storage anew with updated buffer
    let oldObject = getStorageData(key);
    let newObject = object;
    let updatedObject = Object.assign(oldObject , newObject);
    setStorageData(key, updatedObject);
  }

