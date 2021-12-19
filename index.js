const app = require('express')();
const http = require('http').Server(app);
const io = require("socket.io")(http);

app.get('/test', (req, res) => {
    res.sendFile(__dirname + '/test.html');
});

io.on('connection', async socket => {
    socket.on('addUser', (obj) => {
        socket.join(obj.UserName);
        console.log('addUser: ' + obj.UserName);
    }); 

    socket.on('messagePrivate', obj => {
        console.log('messagePrivate: ', obj.Format);
        socket.to(obj.UserName).emit("messagePrivate", obj);
    });

    socket.on('disconnect', () => {
      console.log('disconnect');
    });
    
});

http.listen(80, () => {
    console.log('init');
});