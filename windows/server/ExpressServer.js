
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


const expressServer = () => {
    
            require('./Middleware').init(app);

            require('./Routers').init(app);

            require('./SoketServer').init(io);


            app.get('/', (req, res) => {
                console.info("Hi Man what's up");
                res.write("<h1>Hello man to magic mirror</h1>")
            });

            http.listen(3000, function(){
                console.info("magic server ready to use over http, serve on port 3000 enjoy :)");
            });

} //@Function: expressServer()


module.exports = {
   init: expressServer
}