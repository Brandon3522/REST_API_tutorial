/* 
// setTimeout example
const duration = 50;
setTimeout(() => console.log('Anonymous function timeout.'), duration);

console.log('Before timeout.');

await sleep(2500)
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
} */
////////////////////////////////////////////////////////////////

/* 
// Promise
// Wait one second, 50% chance of resolve / reject w/ getRandomBool
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        if (getRandomBool()) {
            console.log('Promise resolved')
            resolve('Resolved');
        } else {
            console.log('Promise rejected')
            reject('Rejected');
        }
    }, 1000)
});

// Then: promise resolved
// Catch: promise rejected
promise.then((message) => {
    console.log(`Promise: ${message}`)
}).catch((message) => {
    console.log(`Promise: ${message}`)
})

// Await variation
const message = await promise
console.log(`Promise: ${message}`)

function getRandomBool() {
    return Math.random() < 0.5;
}
 */
////////////////////////////////////////////////////////////////

/* // Async variation: Used instead of creating new promise
// Value the promise resolves with returns in the function: return user
async function f() {

    let promise = new Promise((resolve, reject) => {
      setTimeout(() => resolve("done!"), 1000)
    });
  
    let result = await promise; // wait until the promise resolves (*)
  
    console.log(result); // "done!"
  }
  
f(); */
////////////////////////////////////////////////////////////////

// Errors
try {
    printNumber(5);
    printNumber('five');
} catch (error) {
    console.log(`Error: ${error}`);
}

function printNumber(number) {
    if (isNaN(number)) {
        throw 'Not a number!';
    }
    console.log(`Number: ${number}`);
}

// Async/await errors
/* try {
    const leaderboard = await fetchLeaderboard()
    console.log(leaderboard)
} catch (error) {
    console.log(`Error! Servers are down but will be back soon.: ${error}`)
}


async function fetchLeaderboard() {
    const response = await fetch('https://fantasyquest.servers')
    return response.json()
} */
////////////////////////////////////////////////////////////////

/* 
// JSON parsing exercise
async function getLocations() {
    const url = 'https://api.boot.dev/v1/courses_rest_api/learn-http/locations'
    const response = await fetch(url, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'X-API-Key': apiKey,
        'Content-Type': 'application/json'
      }
    })
    return await response.json()
  }
  
  // Don't touch below this line
  
  const apiKey = generateKey()
  
  const locations = getLocations()
  console.log('Got some locations from the server.')
  for (const location of locations) {
    console.log(`- name: ${location.name}, recommendedLevel: ${location.recommendedLevel}`)
  }
  
  function generateKey() {
    const characters = 'ABCDEF0123456789'
    let result = ''
    for (let i = 0; i < 16; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return result
  }
 */
////////////////////////////////////////////////////////////////

console.log('#############################################');
// Parsing JSON exercise
function parseLocation(locationString) {
    try {
        let location = JSON.parse(locationString);
        printLocationObj(location);
    } catch (error) {
        console.log(`Invalid JSON string: ${error}`);
    }
}

// don't touch below this line

function printLocationObj(parsed) {
    console.log(`id: ${parsed.id}`);
    console.log(`discovered: ${parsed.discovered}`);
    console.log(`name: ${parsed.name}`);
    console.log(`recommendedLevel: ${parsed.recommendedLevel}`);
}

parseLocation(`
  {
      "discovered": false,
      "id": "0194fdc2-fa2f-4cc0-81d3-ff12045b73c8",
      "name": "Bandit Camp",
      "recommendedLevel": 14
  `);

console.log('---');

parseLocation(`
  {
      "discovered": false,
      "id": "0194fdc2-fa2f-4cc0-81d3-ff12045b73c8",
      "name": "Bandit Camp",
      "recommendedLevel": 14
  }
  `);
////////////////////////////////////////////////////////////////

// GET method exercise
/* async function getUsers(url, apiKey) {
    const resp = await fetchUser(url, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'X-API-KEY': apiKey,
        },
    });
    return await resp.json();
}

// Don't touch below this line

const generatedKey = generateKey();
const url = 'https://api.boot.dev/v1/courses_rest_api/learn-http/users';
const users = await getUsers(url, generatedKey);
logUsers(users);

function generateKey() {
    const characters = 'ABCDEF0123456789';
    let result = '';
    for (let i = 0; i < 16; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * characters.length)
        );
    }
    return result;
}

function logUsers(users) {
    for (const user of users) {
        console.log(
            `Character name: ${user.characterName}, Class: ${user.class}, Level: ${user.level}, User: ${user.user.name}`
        );
    }
} */
////////////////////////////////////////////////////////////////

/* // POST method exercise
async function createUser(apiKey, url, data) {
    const resp = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': apiKey,
        },
        body: JSON.stringify(data),
    });
    return await resp.json();
}

// Test Suite Don't Touch Below This Line
const userToCreate = {
    characterName: 'Grendel',
    class: 'Warrior',
    level: 1,
    pvpEnabled: false,
    user: {
        name: 'Allan',
        location: 'USA',
        age: 27,
    },
};

const generatedKey = generateKey();
const url = 'https://api.boot.dev/v1/courses_rest_api/learn-http/users';

async function getUsers(url, apiKey) {
    const response = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'X-API-Key': apiKey,
        },
    });
    return response.json();
}

function generateKey() {
    const characters = 'ABCDEF0123456789';
    let result = '';
    for (let i = 0; i < 16; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * characters.length)
        );
    }
    return result;
}

function logUsers(users) {
    for (const user of users) {
        console.log(
            `Character name: ${user.characterName}, Class: ${user.class}, Level: ${user.level}, User: ${user.user.name}`
        );
    }
}

console.log('Retrieving user data...');
const userDataFirst = await getUsers(url, generatedKey);
logUsers(userDataFirst);
console.log('---');

console.log('Creating new character...');
const creationResponse = await createUser(generatedKey, url, userToCreate);
console.log(`Creation response body: ${JSON.stringify(creationResponse)}`);
console.log('---');

console.log('Retrieving user data...');
const userDataSecond = await getUsers(url, generatedKey);
logUsers(userDataSecond);
console.log('---'); */
////////////////////////////////////////////////////////////////
/* 
// PUT Method exercise
async function updateUser(baseURL, id, data, apiKey) {
    const fullURL = `${baseURL}/${id}`;
    const resp = await fetch(fullURL, {
        method: 'PUT',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': apiKey,
        },
        body: json.stringify(data),
    });
    return resp.json();
}

async function getUserById(baseURL, id, apiKey) {
    const fullURL = `${baseURL}/${id}`;
    const resp = await fetch(fullURL, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'X-API-KEY': apiKey,
        },
    });
    return resp.json();
}

// don't touch below this line
const userId = '2f8282cb-e2f9-496f-b144-c0aa4ced56db';
const generatedKey = generateKey();
const baseURL = 'https://api.boot.dev/v1/courses_rest_api/learn-http/users';

function generateKey() {
    const characters = 'ABCDEF0123456789';
    let result = '';
    for (let i = 0; i < 16; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * characters.length)
        );
    }
    return result;
}

function logUser(user) {
    console.log(
        `User uuid: ${user.id}, Character Name: ${user.characterName}, Class: ${user.class}, Level: ${user.level}, PVP Status: ${user.pvpEnabled}, User name: ${user.user.name}`
    );
}

const userData = await getUserById(baseURL, userId, generatedKey);
logUser(userData);

console.log(`Updating user with id: ${userId}`);
userData.characterName = 'Dellbiar';
userData.level = 7;
userData.class = 'Warrior';
userData.pvpEnabled = true;
userData.user.name = 'Allan';
await updateUser(baseURL, userId, userData, generatedKey);

const newUser = await getUserById(baseURL, userId, generatedKey);
logUser(newUser); */
////////////////////////////////////////////////////////////////
/* 
// DELETE Method xercise
async function deleteUser(baseURL, id, apiKey) {
    const fullURL = `${baseURL}/${id}`
    // ?
    const resp = await fetch(fullURL, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
            'X-API-KEY': apiKey
        }
    })
  }
  
  // don't touch below this line
  const userId = '0194fdc2-fa2f-4cc0-81d3-ff12045b73c8'
  const generatedKey = generateKey()
  const url = 'https://api.boot.dev/v1/courses_rest_api/learn-http/users'
  
  async function getUsers(url, apiKey) {
    const response = await fetch(url, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'X-API-Key': apiKey
      }
    })
    return response.json()
  }
  
  function generateKey() {
    const characters = 'ABCDEF0123456789'
    let result = ''
    for (let i = 0; i < 16; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return result
  }
  
  function logUsers(users) {
    console.log("Logging user records:")
    for (const user of users) {
      console.log(`User uuid: ${user.id}, Character name: ${user.characterName}, Class: ${user.class}, Level: ${user.level}, User: ${user.user.name}`)
    }
  }
  
  const users = await getUsers(url, generatedKey)
  logUsers(users)
  console.log('---')
  
  await deleteUser(url, userId, generatedKey)
  console.log(`Deleted user with id: ${userId}`)
  console.log('---')
  
  const newUsers = await getUsers(url, generatedKey)
  logUsers(newUsers)
  console.log('---') */
////////////////////////////////////////////////////////////////

//
