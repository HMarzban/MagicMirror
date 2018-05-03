// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.



// position: top_left, top_center, top_right
// position: bottom_left, bottom_center, bottom_right
const remote = require('electron').remote;
const main = remote.require("./main.js");
const app = remote.getGlobal('sharedObj').express;




/*app.get('/screenOff',(req, res)=>{
    $('body').fadeToggle();
   res.json({"is":true});
});*/









    var http = require('http').Server();
    var io = require('socket.io')(http);

    io.on('connection', function(socket){
        console.log('a user connected');
        socket.on('disconnect', function(){
        console.log('user disconnected');
        });


        socket.on('hi', function(msg){
            console.log("hi frome client");
        });

        socket.on('changeBright', function(_data){
            console.log(_data);
            $('body').css('opacity',_data)
        });
        socket.on('changeZoom', function(_data){
            console.log(_data);
            $('body main').css({ "zoom": _data });
        });


        socket.on('windows_off', function(_is){
            if(_is)
                $('body').fadeIn();
            else
            $('body').fadeOut();
        });


        





    });




    http.listen(5000, function(){
    console.log('listening on *:5000');
    });


