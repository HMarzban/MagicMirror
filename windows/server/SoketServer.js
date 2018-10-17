// position: top_left, top_center, top_right
// position: bottom_left, bottom_center, bottom_right
//const jQuery = $ = require('jquery');

const socket = (io) => {

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

} //@Function: socket( io )


module.exports = {
   init: socket
}
 
