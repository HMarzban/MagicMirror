const $ = require("jquery");
const jQuery = require("jquery");
const path = require('path');
const moment = require('jalali-moment');
//const jsonQuery = require('json-query')

const $config = require(path.join(__dirname, 'config/main.json'));

moment.locale($config.local || 'fa');
let modul_configList = {};
$(function () {


    $('body main').css({ "zoom": $config.zoom });


    // console.log($config)
    $.each($config.modulePostion, function (key, module) {

        //TODO: load css & js file of module :(?)
        //console.log(module)
        var index = $config.modulee.findIndex(el => el.name == module.moduleName);
        var appendModule = $config.modulee[index];
        //console.log(appendModule);
        modul_configList['ID_' + module._id.toString()] = module;

        if (module.visibility) {
            $.get(path.join(__dirname, appendModule.display_src.html), function (data) {
                //first load html and set module ID
                $('.art.' + module.postion).prepend(data).find('section').eq(0).addClass('ID_' + module._id.toString() + ' ' + 'pos-' + module.postion)
                //then load js, and js load seeting from ID which we gave in prev lines to section
                if (appendModule.display_src.js)
                    fn_loadAssets(path.join(__dirname, appendModule.display_src.js), '.art.' + module.postion, 'ID_' + module._id.toString());
            });
        }//condition

    });


    let fn_loadAssets = function (_src, _modulePosition, _id) {
        $.get(_src, function (data) {
            let moduleBase = { location: _src, position: _modulePosition, id: _id }
            $(_modulePosition).find('.' + _id).prepend(`<script>(function ($) {let moduleBase = ${JSON.stringify(moduleBase)}; ${data}}(jQuery));</script>`);
        });
    };


});



function ln() {
    var e = new Error();
    if (!e.stack) try {
        // IE requires the Error to actually be throw or else the Error's 'stack'
        // property is undefined.
        throw e;
    } catch (e) {
        if (!e.stack) {
            return 0; // IE < 10, likely
        }
    }
    var stack = e.stack.toString().split(/\r\n|\n/);
    // We want our caller's frame. It's index into |stack| depends on the
    // browser and browser version, so we need to search for the second frame:
    var frameRE = /:(\d+):(?:\d+)[^\d]*$/;
    do {
        var frame = stack.shift();
    } while (!frameRE.exec(frame) && stack.length);
    var obj = {
        start: frameRE.exec(stack[3])[1],
        end: frameRE.exec(stack.shift())[1]
    }
    return obj;
}// fn ln

function moduleError(_msg, _moduleName, _lineMsg, _lineRoot) {
    this.A = "An error occurred on \"" + _moduleName + "\" module on line: \"" + _lineMsg + "\" which root of this call is on line: \"" + _lineRoot + "\". Error Reason: " + _msg;
    this.obj = {
        message: _msg,
        moduleName: _moduleName,
        lineError: _lineMsg,
        rootError: _lineRoot
    };
}//fn moduleError


