
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
    scientificName: addForm.elements['scientificName'].value,
    DBPediaDescription: addForm.elements['DBPediaDescription'].value,
    geolocation,
    photo,
    id: Math.ceil(Math.random() * 1000000)
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
  }).catch(err => {
    saveNewSight(data)
      .then(() => {
        alert("Save new sight to local successfully! When you online again, it will sync to server");
        addForm.reset();
      })
      .catch(err => {
        console.log(err);
      })

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
      console.log(geolocation)
      renderGeoLocation();
    });
  } else {
    console.log('get position fail')
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

let queryTimer = null;
document.querySelector('#identification')
  .addEventListener('input', function (e) {
     clearTimeout(queryTimer);
     queryTimer = setTimeout(() => {
       fetch(`/sights/query/${e.target.value}`)
         .then(res => res.json())
         .then(data => {
            if (data && data.length > 0) {
              const item = data[0];
              document.querySelector('#scientificName')
                .value = item.scientificName;
              document.querySelector('#DBPediaDescription')
                .value = item.description;
              document.querySelector('#DBPediaURL')
                .value = item.uri;
            } else {
              document.querySelector('#scientificName')
                .value = '';
              document.querySelector('#description')
                .value = '';
              document.querySelector('#DBPediaURL')
                .value = '';
            }
         })
     }, 500);
  });

function onDBReady() {

  getAllNewSight()
    .then(sights => {
      if (Array.isArray(sights) && sights.length > 0) {
        fetch('/sights/many', {
          method: 'POST',
          body: JSON.stringify(sights),
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(res => {
          if (res.status === 201) {
            alert("Have sync all sight from local to server!");
            clearAllSight()
              .then(res => {
                console.log("Clear successfully!");
              })
          }
        }).catch(err => {
        })
      }

    }).catch(err => {
    console.log(err)
  })
}


