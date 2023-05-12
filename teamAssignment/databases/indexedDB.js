let db;
let request = window.indexedDB.open("BirdSightingsDB", 1);

request.onerror = function(event) {
    console.log("Why didn't you allow my web app to use IndexedDB?!");
};
request.onsuccess = function(event) {
    db = request.result;
    console.log("IndexedDB successful")
};

request.onupgradeneeded = function(event) {
    let db = event.target.result;

    // Create an objectStore for this database
    let objectStore = db.createObjectStore("sightings", { keyPath: "id" });
};
