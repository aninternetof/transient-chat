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
    socket.emit('chat', `${nameInput.value}: ${chatInput.value}`);
    chatInput.value = "";
    chatInput.focus();
  }
});

socket.on('broadcast', (d) => {
  const newChat = document.createElement('div');
  newChat.innerText = d;
  chat.append(newChat);
  chat.scrollTo(0, chat.scrollHeight);
});