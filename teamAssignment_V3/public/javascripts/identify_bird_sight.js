
const form = document.querySelector('#form');

form.addEventListener('submit', e => {
  e.preventDefault();
  const sender = form.elements['sender'].value;
  const identification = form.elements['identification'].value;
  const DBPediaURL = form.elements['DBPediaURL'].value;
  const scientificName = form.elements['scientificName'].value;
  const DBPediaDescription = form.elements['DBPediaDescription'].value;


  const url = window.location.href;
  const splits = url.split('/');
  const id = splits[splits.length - 1];

  fetch(`/sights/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      sender,
      identification,
      DBPediaURL,
      scientificName,
      DBPediaDescription
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => {
    if (res.status === 403) {
      alert("Sorry you are not the author!");
    }
    if (res.status === 200) {
      alert("Identify successfully!");
      window.location.href = `/bird_sight/${id}`;
    }
  })

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