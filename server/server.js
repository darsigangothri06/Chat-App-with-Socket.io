const socket = require('socket.io')
const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());

const port = 8000;
const server = app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});

// setup socket connection
io = socket(server, {
    cors:{
        origin: 'http://localhost:3000',
        methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
        allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin', 'Access-Control-Allow-Origin', 'Access-Control-Allow-Headers', 'Access-Control-Allow-Methods', 'Access-Control-Allow-Credentials'],
        withCredentials: true
    }
})
io.on('connection', (socket) => {
    console.log(socket.id)
    /*
        Here, we can start Sockets
        -> We can constantly share the data between the client and the server like,
            -> If the person sends the message to someone, he doesn't need it when he refresh the page
            -> We doesn't need to send database, we are going to send it using sockets
        -> We can send it through sockets
        -> We can emit different messages in different data
    */
   
    // join a room
    socket.on('join_room', (data) => {
        socket.join(data) // data is the name of the room
        console.log('User Joined Room: ' + data)
    })

    // disconnect a user
    socket.on('disconnect', () => {
        console.log('User Disconnected')
    })
})