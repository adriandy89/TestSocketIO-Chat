const cors = require('cors')
const express = require('express');
const app = express();
app.use(cors())

//Server
const port = process.env.PORT || 3000;
const www = process.env.WWW || './public';
app.use(express.static(www));
console.log(`serving ${www}`);
app.get('*', (req, res) => {
    res.sendFile(`index.html`, { root: www });
});

const server = app.listen(port, () => console.log(`listening on http://localhost:${port}`));

//SocketIO Server
const SocketIO = require('socket.io')
const io = SocketIO.listen(server)

//Websockets
io.on('connection', (socket) => {
    console.log('New Conection', socket.id);

    socket.on('chat:message', data => io.sockets.emit('chat:message',data))

    //socket.broadcast.emit ----> Emite a todos menos al dueño
    socket.on('chat:typing', data => socket.broadcast.emit('chat:typing',data))
    socket.on('chat:nottyping', () => socket.broadcast.emit('chat:nottyping'))
})


