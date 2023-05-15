
const DB = 'SIGHTINGS';
const STORES = {
  sights: "sights",
  messages: "messages",
  all_sights: "all_sights"
}
let db;
const request = window.indexedDB.open(DB, 3);

request.onerror = function (event) {
  console.log("Database error: " + event.target.errorCode);
}

request.onsuccess = function (event) {
  db = event.target.result;
  if (window.onDBReady) {
    window.onDBReady();
  }
}

request.onupgradeneeded  = function(event) {
  db = event.target.result;
  for (const key in STORES) {
    if (!db.objectStoreNames.contains(key)) {
      let objectStore = db.createObjectStore(key, {keyPath: 'id'});
      console.log("Created new object store: " + key);
    }
  }

};

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
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/service-worker.js').then(function(registration) {
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}
