const socket = io("/");

const chat = document.querySelector('#chat');
const nameInput = document.querySelector('#nameInput');
const chatInput = document.querySelector('#chatInput');
const formInput = document.querySelector("#chatInputForm");

formInput.addEventListener("submit", () => {
  if (nameInput.value === "") {
    nameInput.classList.add("error");
  } else {
    nameInput.classList.remove("error");
    const message = {
      name: nameInput.value,
      content: chatInput.value,
      room: window.location.pathname,
    }
    socket.emit('chat', JSON.stringify(message));
    chatInput.value = "";
    chatInput.focus();
  }
});

socket.on('broadcast', (d) => {
  messageData = JSON.parse(d);
  const newChat = document.createElement('div');
  newChat.innerText = `${messageData.name}: ${messageData.content}`;
  chat.append(newChat);
  chat.scrollTo(0, chat.scrollHeight);
});

socket.emit('joinroom', window.location.pathname);

socket.on("new user", function(data) {
    console.log("New user. Total users: ", data);
});