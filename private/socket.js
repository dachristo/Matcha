var index = require('../private/socket_index.js');
session = require("express-session")({
    secret: "my-secret",
    resave: true,
    saveUninitialized: true,
    cookie: {
        path: '/'
        ,expires: false
        ,httpOnly: true
    }
}),
    sharedsession = require("express-socket.io-session");

module.exports = function(io) {
    io.use(sharedsession(session));
    io.sockets.on('connection', function (socket) {
        console.log('new user connected');
        socket.on('inscription', function (data) {
            index.inscription(data, inscription_ok);
        });
        socket.on('whoami', function (data) {
            socket.emit('youare', socket.handshake.session.login);
        });
        socket.on('login', function (data){
            index.login(data, log_in);
        });
        socket.on('logout', function(userdata) {
            console.log("logout : "+socket.handshake.session.login);
            if (socket.handshake.session.login == userdata) {
                delete socket.handshake.session.login;
            }
        });
        socket.on('message', function (message) {
            message = ent.encode(message);
            socket.broadcast.emit('message', {message: message, pseudo: socket.pseudo});
        });
        socket.on('petit_nouveau', function (pseudo) {
            pseudo = ent.encode(pseudo);
            socket.pseudo = pseudo;
            socket.broadcast.emit('nouveau_client', pseudo);
        });
        function inscription_ok(data){
            socket.emit('inscription', 'Inscription réussi.');
        }
        function log_in(data){
            if (data) {
                socket.handshake.session.login = data.login;
                console.log(socket.handshake.session.login);
                socket.emit('log_in_ok', socket.handshake.session.login);
            }
            else
                socket.emit('log_in_fail', 'Mauvais login / Mot de passe');

        }
    });
};