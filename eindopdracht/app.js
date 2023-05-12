const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000;

const http = require('http').createServer(app);
const io = require('socket.io')(http);

const users = {}

// Static files
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/img', express.static(__dirname + 'public/img'))

// Set views
app.set('views', './views')
app.set('view engine', 'ejs')

app.get('', (req, res) => {
    res.render('index')
})

http.listen(PORT, () => console.info(`Listening on port ${PORT}`))

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
// }

let data;
let breed;


const randomDog = async () => {
  const url = `https://dog.ceo/api/breeds/image/random`
  const pokeData = await fetchData(url)
  data = pokeData
  console.log(data)
  breed = data.message.split('/')[4];
//   console.log(breed)
  return data
  return breed
}

async function fetchData(url){
  const apiData = await fetch(url)
      .then(response => response.json())
      .catch(err => console.log(err))
    //   const breed = data.message.split('/')[4]; 
  return apiData
}; 

// console.log(breed)

// randomDog()
// getRandomDogImage()

// Connections
io.on('connection', socket => {
    socket.on('new-user', name => {
        users[socket.id] = name
        socket.broadcast.emit('user-connected', name)
        randomDog()
        // console.log(breed)

        .then(data => {
            io.emit('render-dog', data)
        })
    })
    socket.on('send-chat-message', message => {
        socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] })

        if (message  ==  breed) {
            io.emit('correct', { data: data, name: users[socket.id] })
        }
    })
    socket.on('disconnect', () => {
        socket.broadcast.emit('user-disconnected', users[socket.id])
        delete users[socket.id]
    })
})