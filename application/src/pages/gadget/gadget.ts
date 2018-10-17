import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';
import { Socket } from 'ng-socket-io';
import { Jsonp } from '@angular/http';




/**
 * Generated class for the GadgetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-gadget',
  templateUrl: 'gadget.html',
})
export class GadgetPage {

  public WifiModule:any[] =[
  
        {
          name:"SmartSensore",
          id:"4A&7a$sd@dkES4d",
          displayName:"Smart Sensore",
          description:"Smart Sensore, sense temp and light of room.",
          in_out:[
            {
              inputType:"buttonToggle",
              label:"light turn on/off:",
              subscribe:"home/room/plug_5A4S6",
            },
            {
              inputType:"text",
              label:"Temperature Sensor:",
              subscribe:"home/room/temp_5A4S6",
            },
            {
              inputType:"text",
              label:"humidity Sensor:",
              subscribe:"home/room/humi_5A4S6",
            }
      
          ]
        }
  
  ];//WifiModule

  public devices:any = [];
  public sss:any = []

  public mushrooms = true;

  constructor(public navCtrl: NavController, public navParams: NavParams,private socket: Socket) {


    this.socket.emit('SmartSensore','sss')


    // each on 10 seconds fetch new data 
    setInterval(() => {
      this.socket.emit("MQTT_Subscribe","MyData111111111111111")
    }, 10000);


    this.getMessages().subscribe((message:any) => {
     

      for (var property in message.detected_divices) {
        let obj = message.detected_divices[property];

          //First Divice
          if(this.devices.length == 0)
            this.devices.push(message.detected_divices[property])

          
          this.devices.find(x => {
            if(x.id != message.detected_divices[property].id){
              this.devices.push(message.detected_divices[property])
            }else{

              //update mqtt new data message 
              this.devices.forEach((element, index) => {
                if(element.id == message.detected_divices[property].id){
                  this.devices[index] = obj
                }
              });
            
              
            }
          }); // Find 
      }// loop


      console.log(this.devices)
    })// subscribe socket
    


  }//constructor

  ionViewDidLoad() {console.log('ionViewDidLoad GadgetPage');    }





  getMessages() {
    let observable = new Observable(observer => {
      this.socket.on('SmartSensore', (data) => {
        observer.next(data);    
      });
      return () => {
        
        //this.socket.disconnect();
      };  
    })     
    return observable;
  }  



  button_toggleChange(_data){
    console.log(_data);
    this.socket.emit('MQTT_Publish', JSON.stringify( _data));
  }









}
