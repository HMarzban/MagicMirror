var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://192.168.1.102')
const chalk = require('chalk');
const log = console.log;
var Table = require('cli-table');
var figlet = require('figlet');



const {DevicesList} = require('./devices_list');


let deviceObject = {}
let header = []

/*DevicesList.forEach(element=>{
    deviceObject[element.root.in_out[0].subscribe] = "00"

    let Subscriber = '';
    let label = '';
    //console.log(element.root.in_out)
    element.root.in_out.forEach(element=>{
        Subscriber += `${element.subscribe}\n`;
        label += `${element.label}\n`
       
    })
    header.push( [ chalk.magentaBright( element.root.displayName), Subscriber, chalk.green( label),  chalk.magentaBright( `000` )] )
})*/

DevicesList.forEach(element=>{
    deviceObject[element.root.in_out[0].subscribe] = "00"

    let Subscriber = '';
    let label = '';
    //console.log(element.root.in_out)
   /* element.root.in_out.forEach(element=>{
        Subscriber += `${element.subscribe}\n`;
        label += `${element.label}\n`
    });*/

    header.push( [  element.root.displayName, element.root.in_out[0].subscribe, element.root.in_out[0].label ,   `000` ] )
})









 
client.on('connect', function () {
  client.subscribe('presence')
  client.publish('presence', 'Hello mqtt')
})




client.on('message', function (topic, message) {
  // message is Buffer

    /*header.forEach(element=>{
        
    });*/

    header.map(element => {
        if(element[1] == topic){
            element[3] =  message.toString();
        }    
    })


 
})



//table cli
/*setInterval(()=>{
    //console.log(header)

    var table = new Table({
        chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔', 'top-right': '╗'
               , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
               , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
               , 'right': '║' , 'right-mid': '╢' , 'middle': '│' }
      });

      table.push([ chalk.blueBright( 'Divice Name'), chalk.blueBright('Subscriber name'),chalk.blueBright('label'),chalk.blueBright( 'Message' )]);

        header.forEach(element=>{table.push(element)})


         process.stdout.write('\033c');
        
        
        
        console.log(
            chalk.yellow(
              figlet.textSync('IOT Device Semilator', { horizontalLayout: 'default',kerning:'full' })
            )
          );

          console.log(table.toString())




},500)*/





class new_device_server{
     
    constructor(){
        const express = require('express'),
        app = express();
        this.app = app;
    }// class constructor

    initServer(_port,_ip,_data){

        // serve divice datShema info
        this.app.get('/',(req,res)=>{
            res.json(_data.root)
        });

        //Start Server listen
        this.app.listen(_port,_ip || "localhost",()=>{
            console.log(`server ready on port ${_port} ${_ip}  ${process.pid} `)
            this.initMQTTPublisher(_data);
        });
        
    }// fn initServer

    initMQTTPublisher(_data){
        let refTime = _data.setting.refTime
        let range = _data.setting.range
        _data.root.in_out.forEach((element,index)=>{
           
            client.subscribe(element.subscribe)
            setInterval(()=>{
                client.publish(element.subscribe, `${fn_Random(range)}`)
            },refTime)
        })
    }

}// Class new_device_server





 



const simulator = new new_device_server();
/**
 * Start Server Sensore Simulator
 * 
 */
DevicesList.forEach((element,indext)=>{
    simulator.initServer(3000,`127.2.0.${indext + 1}`,element)
});



function fn_Random(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
