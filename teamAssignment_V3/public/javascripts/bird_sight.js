const socket = io();
let offline = false;

const url = window.location.href;

const urlSplits = url.split('/');
const sightId = urlSplits[urlSplits.length - 1];

socket.emit('joinSession', sightId);

socket.on('updateMessages', (dataStr) => {
  const messages = JSON.parse(dataStr);
  renderMessages(messages);
});

socket.on("disconnect", () => {
  offline = true;
});

function renderMessages(messages) {
  messages = messages.sort((prev, next) => {
    return new Date(next.createdAt).getTime() - new Date(prev.createdAt).getTime();
  });
  let innerHTML = '';
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

const messageInput = document.querySelector('#message');
const messageSendButton = document.querySelector('#message-send');
const senderInput = document.querySelector('#sender');

messageSendButton.addEventListener('click', () => {
  const message = messageInput.value;
  const sender = senderInput.value || '';
  if (!message.trim()) {
    alert("You must enter an valid message!");
    return;
  }


  if (!offline) {
    socket.emit('sendMessage', JSON.stringify({
      sightId: sightId,
      message,
      sender
    }));
  } else {
    saveMessage({
      sightId: sightId,
      message,
      sender,
      id: Math.ceil(Math.random() * 100000)
    }).then(() => {
      alert("You are now in offline, the message saved to local, when you retry online, it will be sent to server!")
    })
  }


  messageInput.value = '';
  senderInput.value = '';
});

async function onDBReady() {
  const messages = await getAllMessages();
  if (!offline && Array.isArray(messages) && messages.length > 0) {
    messages.forEach(message => {
      socket.emit('sendMessage', JSON.stringify(message));
    });
    clearAllMessages();
  }
}