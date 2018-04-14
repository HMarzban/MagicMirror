const $= require("jquery");
const jQuery  = require("jquery");
const path = require('path');
const moment = require('jalali-moment');
const jsonQuery = require('json-query')

const $config = require(path.join(__dirname,'config/config.json'));

moment.locale( $config.local || 'fa' );

$(function() {


        $('body main').css({"zoom":$config.zoom});



        $.each( $config.module , function( key, module ) {

            //TODO: load css & js file of module :(?)

            $.get(path.join(__dirname, module.display_src.html) , function(data){
                $('.art.'+module.position).prepend(data);//.append()
            });

        });

        
});