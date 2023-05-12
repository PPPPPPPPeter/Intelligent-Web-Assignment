if ('serviceWorker' in navigator) {
  // Register the service worker
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/service-worker.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}


let identified = false;
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
let allSights = [];
fetch('/sights')
    .then(res => res.json())
    .then(data => {
      allSights = data;
      renderSights();
    })

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
identifiedCheckBox.addEventListener('change', function (e) {
  if (e.target.checked) {
    identified = true;
  } else {
    identified = false;
  }
  renderSights();
});
identifiedCheckBox.click();



function renderSights() {
  let filteredSights = allSights;
  if (identified) {
    filteredSights = filteredSights.filter(sight => sight.identification);
  } else {
    filteredSights = filteredSights.filter(sight => !sight.identification);
  }

  if (sortBy.datetimeSeen) {
    filteredSights.sort((prev, next) => {
      if (sortBy.datetimeSeen === 'asc') {
        return new Date(prev.datetime).getTime() - new Date(next.datetime).getTime();
      } else {
        return new Date(next.datetime).getTime() - new Date(prev.datetime).getTime();
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

  //
  // if (sortBy.distance) {
  //   filteredSights.sort((prev, next) => {
  //     if (sortBy.distance === 'asc') {
  //       return new Date(prev.datetime).getTime() - new Date(next.datetime).getTime();
  //     } else {
  //       return new Date(next.datetime).getTime() - new Date(prev.datetime).getTime();
  //     }
  //   });
  // }

}


