// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.



// position: top_left, top_center, top_right
// position: bottom_left, bottom_center, bottom_right
const remote = require('electron').remote;
const main = remote.require("./main.js");
const app = remote.getGlobal('sharedObj').express;


var http = require('http').Server();
var io = require('socket.io')(http);

/*app.get('/screenOff',(req, res)=>{
    $('body').fadeToggle();
   res.json({"is":true});
});*/











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





    let GlobalDB = {
        detected_divices:{}
    };
    
    
    
    var mqtt = require('mqtt')
    var client = mqtt.connect('mqtt://192.168.43.12',{keepalive:0}),pub_mqtt = mqtt.connect('mqtt://192.168.43.12');

    
    get_device_moduleConfig();
    
    
    
    let SmartModule = "";
    
    
    
    
    function get_device_moduleConfig(){
    
        io.emit("SmartSensore",'SmartMosssssdasdasddule')
    
        //TODO: add retry to waite address and get data
    
                $.get( "http://192.168.43.239/", function( data ) {
                    console.log(data)
                    SmartModule = data


                    GlobalDB.detected_divices[`${data.id}`] = data
                    //GlobalDB.detected_divices.push(data)
    

    
                    // subscribe base on device configuration
                    data.in_out.forEach(element => {
                        client.subscribe(`${element.subscribe}`);
                        //Creat divices list
                        //GlobalDB.divices_event.push({"name":`${element.subscribe.toString()}`})
                    });



                    //setInterval(() => {
                        // console.log("MQTT Status:"+client.connected)
                        //get_message()
                        //console.log(GlobalDB)
                   // }, 8000);
            });
    
    }
    
    
    function get_message(){
        client.reconnect()
        
        if(client.connected){
            client.on('message', function (topic, data) {
                let message = JSON.parse( data.toString() );
                //Update GlobalDB for access it all over the application

                GlobalDB.detected_divices[`${message.id}`].in_out.forEach(element =>{
                    if(message.name == element.subscribe.split('/')[2] ){
                        element['msg'] = message.msg
                    }
                });
                
                
            })

            client.end();

        }// if client mqtt connetcted 

        /*console.log(GlobalDB.detected_divices)

        for (var property in GlobalDB.detected_divices) {
            console.log(property)
            console.log(GlobalDB.detected_divices[property].name)

        }*/

        //console.log(GlobalDB)
        io.emit("SmartSensore",GlobalDB);
    }
    
    
    /*setInterval(()=>{
       // event_mqtt.publish('inTopic', 'dddddHsello Hossein');
        
    },6000)*/


    

   io.on('connection', function(socket){
        /*socket.on("mqtt_publish",function(_data){
            console.log('mqtt_publish');
            console.log(_data);
            client.reconnect()
            if(client.connected){
                event_mqtt.publish(_data.subscribe, _data.msg == "0" ? "1":"0");

               
            }
            
        })*/
    })


    let mqtt_stack = [];


    io.on('connection', function(socket){

        socket.on("MQTT_Publish",(_data)=>{
            console.log(`MQTT_Publish, Data ${ JSON.parse( _data)}`);
            
            _data = JSON.parse(_data);
            //Reconnect to MQTT
            //client.reconnect();


            //if(client.connected){


                console.log(_data)
                pub_mqtt.publish(_data.subscribe, _data.msg == "0" ? "1":"0");
                setTimeout(() => {client.end();}, 1000);
            //}


            
        });

        
        socket.on("MQTT_Subscribe",(_data)=>{
            console.log(`MQTT_Subscribe, Data ${_data}`);
            //Reconnect to MQTT
            client.reconnect();
        });

    })// socket conncetion function





    function fn_mqttpublish (_data){
        if(client.connected){



            //after job done close connection.
            
        }// Condition Client connected.
    }//fn_mqttpublish




    
    setTimeout(() => {client.end();}, 1000);





    client.on('message', function (topic, data) {

        

        if(client.connected){
           // let message = JSON.parse( data.toString() );
           // console.log(`${topic} => ${data}`);

                let message = JSON.parse( data.toString() );
                //Update GlobalDB for access it all over the application

                GlobalDB.detected_divices[`${message.id}`].in_out.forEach(element =>{
                    if(message.name == element.subscribe.split('/')[2] ){
                        element['msg'] = message.msg
                    }
                });
                

            //after job done close connection.
            client.end();

            io.emit("SmartSensore",GlobalDB);
        }
        
    });




   /*setTimeout(() => {
        event_mqtt.publish('home/4$sd4d/plugin', '1');
    }, 10000);

    setTimeout(() => {
        event_mqtt.publish('home/4$sd4d/plugin', '0');
    }, 20000);*/
    
    /*setTimeout(() => {
        //console.log("-----------------------")
        //console.log(GlobalDB.smart_divices)
        //console.log("-----------------------")
      
        
    }, 20000);*/
    
    


    
















































































    http.listen(5000, function(){
    console.log('listening on *:5000');
    });




