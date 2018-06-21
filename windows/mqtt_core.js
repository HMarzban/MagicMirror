





var http = require('http').Server();
var io = require('socket.io')(http);










var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://192.168.43.12')
client.subscribe('outTopic')
get_device_moduleConfig();


/*client.on('connect', function () 
    //when mqtt connected for the first time get configuration data of divices.
    get_device_moduleConfig();

  client.subscribe('outTopic')
  client.subscribe('nodemcu')
  client.subscribe('nodemcu/photocell')
  client.subscribe('test')
  client.subscribe('outTopic')
  
  
  
  console.log("Hi Man start mqtt")
  
  client.publish('nodemcu', 'Hello mqtt')
})*/





let SmartModule = "";




function get_device_moduleConfig(){


            $.get( "http://192.168.43.239/", function( data ) {
                console.log(data)
                SmartModule = data

                io.emit("SmartSensore",SmartModule)


                let t1 = 0

                setInterval(() => {
                    t1++
                
                    io.emit("SmartSensore",'SmartModule==>'+t1);
                    console.log("MQTT Status:"+client.connected)
                    get_message()
                   
                }, 6000);
                

        });





}


function get_message(){

    client.reconnect()

    if(client.connected){
        client.on('message', function (topic, message) {
            // message is Buffer
            console.log(`topic: ${topic} and message: ${message.toString()}`)
            client.end()
        })
    }
    
}




