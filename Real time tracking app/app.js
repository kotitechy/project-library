const express = require('express')
const http = require('http')
const path = require('path')
const socketio = require('socket.io')
const cors = require('cors')

// css and js
// https://cdnjs.com/libraries/leaflet
const app = express()
const server = http.createServer(app)

const io = socketio(server)

app.set('view engine','ejs')
app.use(express.static(path.join(__dirname,'public')))
app.use(cors()) // enable cors for all routes


// accept location in backend
io.on('connection',(socket)=>{
    console.log('connected: ', socket.id);
    
    socket.on('send-location', (data)=>{
        io.emit('recieve-location', {id: socket.id, latitude: data.latitude, longitude: data.longitude})
    })
    console.log('connected')
    // disconnect
    socket.on('disconnect', ()=>{
        console.log('user disconnected: ', socket.id);
        
        io.emit('user-disconncted')
    })
})


// io conection

app.get('/',(req, res)=>{
    res.render('index')
})


server.listen(3000)