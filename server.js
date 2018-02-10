var express = require('express'),
    app = new express(),
    path = require('path'),
    server = require('http').createServer(app);
io = require('socket.io').listen(server);
users = [],
    connections = [];

app.use(express.static(path.join(__dirname, '/')));
server.listen(process.env.PORT || 3000, function () {
});
console.log('server running');


app.get('/', (req, res) => {

    res.sendFile(__dirname + '/index.html');
});


io.on('connection', (socket) => {
    connections.push(socket);
    console.log('Connected: %s connections', connections.length);

    socket.on('disconnect', (data) => {
        connections.splice(connections.indexOf(socket));
        console.log('disconnected: %s sockets connected', connections.length);
    });

    socket.on('send-message',(data)=>{
        console.log(data);
        io.sockets.emit('new-message',{msg:data});
    })

})
