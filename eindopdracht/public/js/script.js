const socket = io();
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')
const chatroom = document.getElementsByClassName('.chatroom')

const name = prompt('What is your name?')
appendMessage('You joined')
socket.emit('new-user', name)

// function getRandomDogImage() {
//     fetch('https://dog.ceo/api/breeds/image/random')
//       .then(response => response.json())
//       .then(data => {
//         var dogImage = document.getElementById('dog-image');
//         dogImage.src = data.message;
//         dogImage.alt = data.message.split('/')[4]; // extract the breed name from the image URL and set it as the alt text
//         console.log(data)
//         // pak het 5e element van de url
//         const breed = data.message.split('/')[4]; 
//         console.log(breed)
//       })
//   }

socket.on('chat-message', data => {
  appendMessage(`${data.name}: ${data.message}`)
})

socket.on('user-connected', name => {
  appendMessage(`${name} connected`)
})

socket.on('render-dog', data => {
  console.log(data)
  var dogImage = document.getElementById('dog-image');
  dogImage.src = data.message;
})

socket.on('user-disconnected', name => {
  appendMessage(`${name} disconnected`)
})

socket.on('correct', data => {
  const messageElement = document.createElement('div');
  messageElement.innerText = (`${data.name}  has guessed correctly!`);
  messageElement.classList.add('correct-message');
  messageContainer.append(messageElement);
  const nameDog = data.message.split('/')[4];
  console.log(nameDog)
});

messageForm.addEventListener('submit', e => {
  e.preventDefault()
  const message = messageInput.value
  appendMessage(`You: ${message}`)
  socket.emit('send-chat-message', message)
  messageInput.value = ''
})

function appendMessage(message) {
  const messageElement = document.createElement('div')
  messageElement.innerText = message 
  messageElement.classList.add('message');
  messageContainer.append(messageElement)

  messageContainer.scrollTop = messageContainer.scrollHeight
}