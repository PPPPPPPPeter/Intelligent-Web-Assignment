
const form = document.querySelector('#form');

form.addEventListener('submit', e => {
    e.preventDefault();
    const sender = form.elements['sender'].value;
    const identification = form.elements['identification'].value;
    const DBPediaURL = form.elements['DBPediaURL'].value;

    const url = window.location.href;
    const splits = url.split('/');
    const id = splits[splits.length - 1];
    fetch(`/sights/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            sender,
            identification,
            DBPediaURL
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
            history.back();
        }
    })

});