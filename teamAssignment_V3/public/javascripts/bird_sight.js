// Initialize the socket connection
const socket = io();
// Define a flag to indicate whether the user is offline
let offline = false;

// Get the current URL
const url = window.location.href;
// Split the URL into segments
const urlSplits = url.split('/');
// Get the last segment of the URL, which is the sight ID
const sightId = urlSplits[urlSplits.length - 1];

// Send a joinSession event to the server with the sight ID
socket.emit('joinSession', sightId);

/**
 * Event: updateMessages
 * Description: Receives updated messages from the server and render them on the page
 */
socket.on('updateMessages', (dataStr) => {
  const messages = JSON.parse(dataStr);
  renderMessages(messages);
});

/**
 * Event: disconnect
 * Description: Sets the offline flag to true when the socket connection is lost
 */
socket.on("disconnect", () => {
  offline = true;
});

/**
 * Function: renderMessages
 * Description: Renders the received messages on the page
 */
function renderMessages(messages) {
  // Sort messages by created date in descending order
  messages = messages.sort((prev, next) => {
    return new Date(next.createdAt).getTime() - new Date(prev.createdAt).getTime();
  });
  let innerHTML = '';
  // Iterate through each message and add it to the innerHTML
  messages.forEach(message => {
    innerHTML += `
    <li class="list-group-item">
      <div class="d-flex align-items-center">
        <i class="bi bi-person-circle me-2" style="font-size: 30px"></i>
        <h5 class="m-0">${message.sender}</h5>
      </div>
      <p class="mt-3">
        ${message.message}
      </p>
      <cite>Publish at ${new Date(message.createdAt).toLocaleString()}</cite>
    </li>
    `;
  })
  document.querySelector('#messages').innerHTML = innerHTML;
}

// Grab the message input and send button, and the sender input
const messageInput = document.querySelector('#message');
const messageSendButton = document.querySelector('#message-send');
const senderInput = document.querySelector('#sender');

/**
 * Event: Click
 * Description: Sends the input message to the server when the send button is clicked
 */
messageSendButton.addEventListener('click', () => {
  const message = messageInput.value;
  const sender = senderInput.value || '';
  if (!message.trim()) {
    alert("You must enter an valid message!");
    return;
  }

  // If the user is not offline, send the message to the server
  if (!offline) {
    socket.emit('sendMessage', JSON.stringify({
      sightId: sightId,
      message,
      sender
    }));
  } else {
    // If the user is offline, save the message locally
    saveMessage({
      sightId: sightId,
      message,
      sender,
      id: Math.ceil(Math.random() * 100000)
    }).then(() => {
      alert("You are now in offline, the message saved to local, when you retry online, it will be sent to server!")
    })
  }

  // Reset the message and sender inputs
  messageInput.value = '';
  senderInput.value = '';
});

/**
 * Function: onDBReady
 * Description: Sends all saved messages to the server when the database is ready and the user is not offline
 */
async function onDBReady() {
  const messages = await getAllMessages();
  if (!offline && Array.isArray(messages) && messages.length > 0) {
    messages.forEach(message => {
      socket.emit('sendMessage', JSON.stringify(message));
    });
    clearAllMessages();
  }
}
