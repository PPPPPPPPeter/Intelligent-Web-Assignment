/**
 * Constant variables.
 */
const DB = 'SIGHTINGS';
const STORES = {
  sights: "sights",
  messages: "messages",
  all_sights: "all_sights"
}
let db;
/**
 * Constant variables.
 */
const request = window.indexedDB.open(DB, 3);
/**
 * Handle the error event of indexedDB connection.
 */
request.onerror = function (event) {
  console.log("Database error: " + event.target.errorCode);
}
/**
 * Handle the success event of indexedDB connection.
 * If there is a callback function named onDBReady in window, it will be called.
 */
request.onsuccess = function (event) {
  db = event.target.result;
  if (window.onDBReady) {
    window.onDBReady();
  }
}
/**
 * Handle the upgradeneeded event of indexedDB connection.
 * In this event, it will create object stores defined in STORES constant if they don't exist.
 */
request.onupgradeneeded  = function(event) {
  db = event.target.result;
  for (const key in STORES) {
    if (!db.objectStoreNames.contains(key)) {
      let objectStore = db.createObjectStore(key, {keyPath: 'id'});
      console.log("Created new object store: " + key);
    }
  }

};
/**
 * Function: saveMessage
 * Description: Save a message in the 'messages' object store.
 * Input: A message object to be saved.
 * Output: A Promise which resolves if the operation is successful.
 */
function saveMessage(message) {
  return new Promise((resolve, reject) => {
    let transaction = db.transaction([STORES.messages], 'readwrite');
    let store = transaction.objectStore(STORES.messages);
    let addRequest = store.add(message);
    addRequest.onerror = function (event) {
      console.log("Error adding data: " + event.target.errorCode);
      reject(event.target.errorCode);
    }
    addRequest.onsuccess = function (event) {
      resolve();
    }
  })
}
/**
 * Function: saveMessage
 * Description: Save a message in the 'messages' object store.
 * Input: A message object to be saved.
 * Output: A Promise which resolves if the operation is successful.
 */
function getAllMessages() {
  return new Promise((resolve, reject) => {
    let transaction = db.transaction([STORES.messages], 'readonly');
    let store = transaction.objectStore(STORES.messages);
    let cursor = store.openCursor();
    let sightings = [];
    cursor.onerror = function (event) {
      console.log("Error adding data: " + event.target.errorCode);
      reject(event.target.errorCode);
    }
    cursor.onsuccess = function (event) {
      let cur = event.target.result;
      if (cur) {
        let data = cur.value;
        sightings.push(data);
        cur.continue();
      } else {
        resolve(sightings);
      }
    }
  })
}
/**
 * Function: clearAllMessages
 * Description: Clears all messages from the 'messages' object store.
 * Output: A Promise which resolves if the operation is successful.
 */
function clearAllMessages() {
  return new Promise((resolve, reject) => {
    let transaction = db.transaction([STORES.messages], 'readwrite');
    let sightingsStore = transaction.objectStore(STORES.messages);
    let clearRequest = sightingsStore.clear();
    clearRequest.onerror = function (event) {
      console.log("Error adding data: " + event.target.errorCode);
      reject(event.target.errorCode);
    }
    clearRequest.onsuccess = function (event) {
      resolve();
    }
  })
}
/**
 * Function: clearAllMessages
 * Description: Clears all messages from the 'messages' object store.
 * Output: A Promise which resolves if the operation is successful.
 */
function saveAllSights(sights) {
  sights = sights.map(sight => {
    sight.id = Math.ceil(Math.random() * 100000);
    return sight;
  })
  return new Promise((resolve, reject) => {
    let transaction = db.transaction([STORES.all_sights], 'readwrite');
    let sightingsStore = transaction.objectStore(STORES.all_sights);
    let count = 0;
    for (let i = 0; i < sights.length; i ++) {
      let sight = sights[i];
      let addRequest = sightingsStore.add(sight);
      addRequest.onerror = function (event) {
        console.log("Error adding data: " + event.target.errorCode);
        reject(event.target.errorCode);
      }
      addRequest.onsuccess = function (event) {
        count ++;
        if (count === sights.length) {
          resolve();
        }
      }
    }

  })
}
/**
 * Function: clearAllSights
 * Description: Clears all sightings from the 'all_sights' object store.
 * Output: A Promise which resolves if the operation is successful.
 */
function clearAllSights() {
  return new Promise((resolve, reject) => {
    let transaction = db.transaction([STORES.all_sights], 'readwrite');
    let sightingsStore = transaction.objectStore(STORES.all_sights);
    let clearRequest = sightingsStore.clear();
    clearRequest.onerror = function (event) {
      console.log("Error adding data: " + event.target.errorCode);
      reject(event.target.errorCode);
    }
    clearRequest.onsuccess = function (event) {
      resolve();
    }
  })
}
/**
 * Function: clearAllSights
 * Description: Clears all sightings from the 'all_sights' object store.
 * Output: A Promise which resolves if the operation is successful.
 */
function getAllSights() {
  return new Promise((resolve, reject) => {
    let transaction = db.transaction([STORES.all_sights], 'readonly');
    let sightingsStore = transaction.objectStore(STORES.all_sights);
    let cursor = sightingsStore.openCursor();
    let sightings = [];
    cursor.onerror = function (event) {
      console.log("Error adding data: " + event.target.errorCode);
      reject(event.target.errorCode);
    }
    cursor.onsuccess = function (event) {
      let cur = event.target.result;
      if (cur) {
        let data = cur.value;
        sightings.push(data);
        cur.continue();
      } else {
        resolve(sightings);
      }
    }
  })
}
/**
 * Function: clearAllSights
 * Description: Clears all sightings from the 'all_sights' object store.
 * Output: A Promise which resolves if the operation is successful.
 */
function saveNewSight(sight) {
  console.log(sight)
  return new Promise((resolve, reject) => {
    let transaction = db.transaction([STORES.sights], 'readwrite');
    let sightingsStore = transaction.objectStore(STORES.sights);
    let addRequest = sightingsStore.add(sight);
    addRequest.onerror = function (event) {
      console.log("Error adding data: " + event.target.errorCode);
      reject(event.target.errorCode);
    }
    addRequest.onsuccess = function (event) {
      resolve();
    }
  })
}
/**
 * Function: getAllNewSight
 * Description: Retrieves all new sightings from the 'sights' object store.
 * Output: A Promise which resolves with an array of all new sightings.
 */
function getAllNewSight() {
  return new Promise((resolve, reject) => {
    let transaction = db.transaction([STORES.sights], 'readonly');
    let sightingsStore = transaction.objectStore(STORES.sights);
    let cursor = sightingsStore.openCursor();
    let sightings = [];
    cursor.onerror = function (event) {
      console.log("Error adding data: " + event.target.errorCode);
      reject(event.target.errorCode);
    }
    cursor.onsuccess = function (event) {
      let cur = event.target.result;
      if (cur) {
        let data = cur.value;
        sightings.push(data);
        cur.continue();
      } else {
        resolve(sightings);
      }
    }
  })
}
/**
 * Function: clearAllSight
 * Description: Clears all new sightings from the 'sights' object store.
 * Output: A Promise which resolves if the operation is successful.
 */
function clearAllSight() {
  return new Promise((resolve, reject) => {
    let transaction = db.transaction([STORES.sights], 'readwrite');
    let sightingsStore = transaction.objectStore(STORES.sights);
    let clearRequest = sightingsStore.clear();
    clearRequest.onerror = function (event) {
      console.log("Error adding data: " + event.target.errorCode);
      reject(event.target.errorCode);
    }
    clearRequest.onsuccess = function (event) {
      resolve();
    }
  })
}
/**
 * Service Worker registration.
 */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/service-worker.js').then(function(registration) {
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}
