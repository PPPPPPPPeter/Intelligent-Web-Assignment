
function distance(lat1, lon1, lat2, lon2) {
  const earthRadius = 6371;

  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
    Math.cos(toRadians(lat2)) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = earthRadius * c;

  return distance;
}

function toRadians(degrees) {
  return degrees * Math.PI / 180;
}

let identified = true;
let not_identified = true;
const sortBy = {
  datetimeSeen: null,
  distance: null
}

const sortDatetimeSeenButton = document.querySelector('#sort-datetime-seen');
const sortDatetimeSeenIcon = document.querySelector('#sort-date-time-seen-icon');
sortDatetimeSeenButton.addEventListener('click', () => {
  if (!sortBy.datetimeSeen) {
    sortBy.datetimeSeen = 'desc';
  } else if (sortBy.datetimeSeen === 'desc') {
    sortBy.datetimeSeen = 'asc';
  } else if (sortBy.datetimeSeen === 'asc') {
    sortBy.datetimeSeen = null;
  }
  renderSights();
  renderSortButtons();
});


const sortDistanceButton = document.querySelector('#sort-distance');
const sortDistanceIcon = document.querySelector('#sort-distance-icon');
sortDistanceButton.addEventListener('click', () => {
  if (!sortBy.distance) {
    sortBy.distance = 'asc';
  } else if (sortBy.distance === 'asc') {
    sortBy.distance = 'desc';
  } else if (sortBy.distance === 'desc') {
    sortBy.distance = null;
  }
  renderSights();
  renderSortButtons();
});

function renderSortButtons() {
  // render datetime seen sort button
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

  // render distance sort button
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


const identifiedCheckBox = document.querySelector('#identification');
const not_identifiedCheckBox = document.querySelector('#not-identification');
identifiedCheckBox.addEventListener('change', function (e) {
  if (e.target.checked) {
    identified = true;
  } else {
    identified = false;
  }
  renderSights();
});
not_identifiedCheckBox.addEventListener('change', function (e) {
  if (e.target.checked) {
    not_identified = true;
  } else {
    not_identified = false;
  }
  renderSights();
});

function renderSights() {
  let filteredSights = allSights;
  filteredSights = filteredSights.filter(sight => {
    if (identified && sight.identification) {
      return true;
    }
    if (not_identified && !sight.identification) {
      return true;
    }
    return false;
  });


  if (sortBy.datetimeSeen) {
    filteredSights.sort((prev, next) => {
      if (sortBy.datetimeSeen === 'asc') {
        return new Date(prev.datetime).getTime() - new Date(next.datetime).getTime();
      } else {
        return new Date(next.datetime).getTime() - new Date(prev.datetime).getTime();
      }
    });
  }

  if (sortBy.distance) {
    filteredSights.sort((prev, next) => {
      const dis = distance(prev.geolocation.latitude, prev.geolocation.longitude, next.geolocation.latitude, next.geolocation.longitude);

      if (sortBy.distance === 'asc') {
        return dis;
      } else {
        return -dis;
      }
    });
  }

  let innerHTML = '';
  filteredSights.forEach(sight => {
    innerHTML += `
      <a href="/bird_sight/${sight._id}" class="col-12 col-lg-4 mb-2">
           <img class="w-100 rounded rounded-2" src="${sight.photo}"/>
      </a>
    `;
  })

  document.querySelector('#sights').innerHTML = innerHTML;


}

let allSights = [];


function onDBReady() {
  fetch('/sights')
    .then(res => res.json())
    .then( async data => {
      allSights = data;
      renderSights();
      await clearAllSights();
      await saveAllSights(allSights);
    })
}
