const $= require("jquery");
const jQuery  = require("jquery");
const path = require('path');
const moment = require('jalali-moment');
const jsonQuery = require('json-query')

const $config = require(path.join(__dirname,'config/main.json'));

moment.locale( $config.local || 'fa' );
let modul_configList = {};
$(function() {

        
        $('body main').css({"zoom":$config.zoom});


       // console.log($config)
        $.each( $config.modulePostion , function( key, module ) {

            //TODO: load css & js file of module :(?)

         //   console.log(module)

            var index = $config.modulee.findIndex(el => el.name==module.moduleName);
            var appendModule = $config.modulee[index];
           // console.log(appendModule);
            modul_configList['ID_'+module._id.toString()] = module;

             $.get(path.join(__dirname, appendModule.display_src.html) , function(data){
                 //first load html and set module ID
                 $('.art.'+module.postion).prepend(data).find('section').eq(0).addClass('ID_'+module._id.toString()+' '+'pos-'+module.postion)
                 //then load js, and js load seeting from ID which we gave in prev lines to section
                 fn_loadAssets(path.join(__dirname, appendModule.display_src.js),'.art.'+module.postion,'ID_'+module._id.toString());
             });
             

             //console.log(modul_configList)



        });


        let fn_loadAssets = function(_src,_modulePosition,_id){

            $.get(_src, function(data){
                $(_modulePosition).find('.'+_id).prepend("<script>"+data+"</script>");
            });

        };

        
});