// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', function() {
//     navigator.serviceWorker.register('/service-worker.js').then(function(registration) {
//       // Registration was successful
//       console.log('ServiceWorker registration successful with scope: ', registration.scope);
//     }, function(err) {
//       // registration failed :(
//       console.log('ServiceWorker registration failed: ', err);
//     });
//   });
// }

const addForm = document.querySelector('#add-form');
addForm.addEventListener('submit', (e) => {
  e.preventDefault();

  if (!photo) {
    alert("You must upload the bird photo you shoot!");
    return;
  }

  if (!geolocation) {
    alert("You should firstly get your location!");
    return;
  }


  const data = {
    author: addForm.elements['name'].value,
    datetime: addForm.elements['datetime'].value,
    description: addForm.elements['description'].value,
    identification: addForm.elements['identification'].value,
    DBPediaURL: addForm.elements['DBPediaURL'].value,
    geolocation,
    photo
  };

  fetch('/sights', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => {
    if (res.status === 201) {
      alert("Add sucessfully!");
      window.location.reload();
    }
  })



});

let geolocation;
const getLocationButton = document.querySelector('#get-location');
getLocationButton.addEventListener('click', () => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      geolocation = {
        latitude,
        longitude
      }
      renderGeoLocation();
    });
  } else {

  }

})


function renderGeoLocation() {
  document.querySelector('#geolocation')
    .innerHTML = `Latitude: ${geolocation.latitude}, Longitude: ${geolocation.longitude}`;
}


let photo;
const photoFileInput = document.querySelector('#photo');
photoFileInput.addEventListener('change', e => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.addEventListener('load', () => {
    photo = reader.result;
    document.querySelector('#photo-placeholder').classList.add('d-none');
    document.querySelector('#photo-result').classList.remove('d-none');
    document.querySelector('#photo-result').src = photo;
  });
  reader.readAsDataURL(file);
});
