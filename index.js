const app = require('express')();
const http = require('http').Server(app);
const io = require("socket.io")(http);
const port = process.env.PORT || 3000;

app.get('/', (req, res) => res.send("run run ... <br>zeganet") );

io.on('connection', async socket => {
    socket.on('addUser', (obj) => socket.join(obj.UserName) ); 
    socket.on('messagePrivate', obj => socket.to(obj.UserName).emit("messagePrivate", obj) );
});

http.listen(port, () => console.log(`Init port: ${port}`));