
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const ip = require('ip');


const expressServer = () => {
    
            require('./Middleware').init(app);

            require('./Routers').init(app);

            require('./SoketServer').init(io);

            http.listen(3000, function(){
                console.info(`
                    magic server ready to use over http, serve on port 3000 enjoy :)
                    Network: ${ip.address()}
                `);
            });

} //@Function: expressServer()


module.exports = {
   init: expressServer
}