// Obtain the form element
const form = document.querySelector('#form');

/**
 * Event: Submit form
 * Description: Prevents the default form submission, collects the form data, and sends a PUT request to the server.
 */
form.addEventListener('submit', e => {
  // Prevent the default form submission
  e.preventDefault();

  // Get the values from the form fields
  const sender = form.elements['sender'].value;
  const identification = form.elements['identification'].value;
  const DBPediaURL = form.elements['DBPediaURL'].value;
  const scientificName = form.elements['scientificName'].value;
  const DBPediaDescription = form.elements['DBPediaDescription'].value;

  // Extract the ID from the current URL
  const url = window.location.href;
  const splits = url.split('/');
  const id = splits[splits.length - 1];

  // Send a PUT request to the server with the form data
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
    // Handle the response status
    if (res.status === 403) {
      alert("Sorry you are not the author!");
    }
    if (res.status === 200) {
      alert("Identify successfully!");
      window.location.href = `/bird_sight/${id}`;
    }
  })
});

// Initialize a timer for the query
let queryTimer = null;

/**
 * Event: Input field changes
 * Description: When the input value changes, the function waits for 500ms before sending a GET request to the server.
 */
document.querySelector('#identification')
    .addEventListener('input', function (e) {
      clearTimeout(queryTimer);
      queryTimer = setTimeout(() => {
        // Send a GET request to the server to query the identification
        fetch(`/sights/query/${e.target.value}`)
            .then(res => res.json())
            .then(data => {
              // Fill the form fields with the returned data
              if (data && data.length > 0) {
                const item = data[0];
                document.querySelector('#scientificName')
                    .value = item.scientificName;
                document.querySelector('#DBPediaDescription')
                    .value = item.description;
                document.querySelector('#DBPediaURL')
                    .value = item.uri;
              } else {
                // Clear the form fields if no data is returned
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
