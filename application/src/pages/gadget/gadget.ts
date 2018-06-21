import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';




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



  constructor(public navCtrl: NavController, public navParams: NavParams,) {

    


  }

  ionViewDidLoad() {


    console.log('ionViewDidLoad GadgetPage');




  }

}
