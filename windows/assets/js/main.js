const $ = require("jquery");
const path = require('path');

const $config = require(path.join(__dirname,'config/config.json'));

$(function() {
    console.log( "ready!" );
    console.log($config);

    //$('#btn_clickMe').on("click",function(){


        $.each( $config.module , function( key, module ) {

            $.get(path.join(__dirname, module.display_src.html) , function(data){
                $('.art.'+module.position).prepend(data);//.append()
            });

        });

        




   // });



  /*  const fn_loadBackHandler = (response, status, xhr) =>{
        if ( status == "error" ) {
            var msg = "Sorry but there was an error: ";
            console.log(msg + xhr.status + " " + xhr.statusText );
        }
    }; */// fn_loadBackHandler


});