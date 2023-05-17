// Function to calculate distance between two geographical coordinates
function distance(lat1, lon1, lat2, lon2) {
  const earthRadius = 6371; // Earth's radius in kilometers

  const dLat = toRadians(lat2 - lat1); // Difference in latitude converted to radians
  const dLon = toRadians(lon2 - lon1); // Difference in longitude converted to radians

  // Haversine formula to calculate the great-circle distance between two points on a sphere from their longitudes and latitudes
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); // Angular distance in radians

  const distance = earthRadius * c; // Distance calculation

  return distance; // Return the calculated distance
}

// Function to convert degrees to radians
function toRadians(degrees) {
  return degrees * Math.PI / 180;
}

// Variables to store whether identified and not identified sights should be displayed
let identified = true;
let not_identified = true;

// Object to store the current sorting option for both datetimeSeen and distance
const sortBy = {
  datetimeSeen: null,
  distance: null
}

// Selecting the buttons for sorting and adding click event listeners to them
const sortDatetimeSeenButton = document.querySelector('#sort-datetime-seen');
const sortDatetimeSeenIcon = document.querySelector('#sort-date-time-seen-icon');
sortDatetimeSeenButton.addEventListener('click', () => {
  // Toggle sorting option between 'desc', 'asc', and 'null'
  if (!sortBy.datetimeSeen) {
    sortBy.datetimeSeen = 'desc';
  } else if (sortBy.datetimeSeen === 'desc') {
    sortBy.datetimeSeen = 'asc';
  } else if (sortBy.datetimeSeen === 'asc') {
    sortBy.datetimeSeen = null;
  }
  renderSights(); // Re-render the sights with the new sorting option
  renderSortButtons(); // Re-render the sort buttons to reflect the current sorting option
});

// Similarly for sorting by distance
const sortDistanceButton = document.querySelector('#sort-distance');
const sortDistanceIcon = document.querySelector('#sort-distance-icon');
sortDistanceButton.addEventListener('click', () => {
  // Toggle sorting option between 'asc', 'desc', and 'null'
  if (!sortBy.distance) {
    sortBy.distance = 'asc';
  } else if (sortBy.distance === 'asc') {
    sortBy.distance = 'desc';
  } else if (sortBy.distance === 'desc') {
    sortBy.distance = null;
  }
  renderSights(); // Re-render the sights with the new sorting option
  renderSortButtons(); // Re-render the sort buttons to reflect the current sorting option
});

// Function to render sort buttons based on the current sort order
function renderSortButtons() {
  // render datetime seen sort button
  // Remove all classes and add the appropriate class based on the current sort order
  sortDatetimeSeenIcon.classList.remove('bi', 'bi-list', 'bi-sort-down', 'bi-sort-up');
  if (!sortBy.datetimeSeen) {
    sortDatetimeSeenIcon.classList.add('bi', 'bi-list');
  }
  if (sortBy.datetimeSeen === 'desc') {
    sortDatetimeSeenIcon.classList.add('bi', 'bi-sort-down');
  }
  if (sortBy.datetimeSeen === 'asc') {
    sortDatetimeSeenIcon.classList.add('bi', 'bi-sort-up');
  }

  // Similarly for the distance sort button
  sortDistanceIcon.classList.remove('bi', 'bi-list', 'bi-sort-down', 'bi-sort-up');
  if (!sortBy.distance) {
    sortDistanceIcon.classList.add('bi', 'bi-list');
  }
  if (sortBy.distance === 'asc') {
    sortDistanceIcon.classList.add('bi', 'bi-sort-up');
  }
  if (sortBy.distance === 'desc') {
    sortDistanceIcon.classList.add('bi', 'bi-sort-down');
  }
}

// Selecting the checkboxes and adding change event listeners to them
const identifiedCheckBox = document.querySelector('#identification');
const not_identifiedCheckBox = document.querySelector('#not-identification');
identifiedCheckBox.addEventListener('change', function (e) {
  // Toggle the variable identified when the checkbox state changes
  if (e.target.checked) {
    identified = true;
  } else {
    identified = false;
  }
  renderSights(); // Re-render the sights
});
not_identifiedCheckBox.addEventListener('change', function (e) {
  // Toggle the variable not_identified when the checkbox state changes
  if (e.target.checked) {
    not_identified = true;
  } else {
    not_identified = false;
  }
  renderSights(); // Re-render the sights
});

// Function to render the sights
function renderSights() {
  // Filter and sort the sights based on the current sorting option, identified, and not_identified variables
  // After filtering and sorting, generate the HTML to display the sights and set it as the innerHTML of the sights container
  // The rest of the function implementation goes here
}

let allSights = []; // Variable to store all sights

// Function to be called when the database is ready
function onDBReady() {
  // Fetch all sights from the server, render them, and save them to IndexedDB
  // The rest of the function implementation goes here
}
