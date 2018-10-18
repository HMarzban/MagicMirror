import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { HomePage } from '../home/home';
import {TabsPage} from "../tabs/tabs"

/**
 * Generated class for the EntryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-entry',
  templateUrl: 'entry.html',
})
export class EntryPage {

  spinner:boolean = false

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    private alertCtrl: AlertController,
  ){}

  alert( data:any ) {
    let alert = this.alertCtrl.create({
      title: data.title,
      subTitle: data.msg,
      buttons: [
        {
          text: 'Try Again',
          role: 'Dismiss',
          
        }
      ]
    });
    alert.present();
  } //@Function: alert()

  ionViewDidLoad() {
    console.log('ionViewDidLoad EntryPage');
  }
  entry = {
    Name:"",
    IpAddress:""
  }

  entryForm(){
    if(!this.spinner){
      if(this.entry.IpAddress.length >= 10){
        
          const settings = {
            ipAddress : `http://${this.entry.IpAddress}:3000`,
            name: this.entry.Name
          }
          
        this.checkServerConnection(settings)
        this.spinner = !this.spinner;
      }else{
        this.alert( {title:"Entry Details", msg:"IP Address its seems does not correct, please try again."})
      }
    }
  } //@Function: entryForm()

  checkServerConnection(_settings){
    console.log(_settings)
    console.log(_settings.ipAddress)
    this.http.get(`${_settings.ipAddress}/conf`)
      .map(res => res.json())
      .subscribe(
        data => {
          if(data.module){
            setTimeout(()=>{
              this.spinner = !this.spinner;
              localStorage.setItem("ServerRemoteAddress", JSON.stringify(_settings)) 
              this.navCtrl.push(TabsPage)
            },1000)
          }
        },err => {
          console.log(err)
          this.spinner = !this.spinner;
          this.alert( {title:"Server connection", msg:"We can not connect to server please check your IPAddress and connection with server then try again."})
        }
    );
  } //@Functin: checkServerConnection()

} //@Function: EntryPage()
