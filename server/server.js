const dotenv = require('dotenv');
const socket = require('socket.io')
const app = require('./app');

// get access to config.env file
dotenv.config({ path: './config.env' });

const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});

// setup socket connection
io = socket(server)
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