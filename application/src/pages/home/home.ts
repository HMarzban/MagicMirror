import { Component } from '@angular/core';
import { NavController,ModalController, NavParams } from 'ionic-angular';
import { ModuleChosePage } from '../modals/module-chose/module-chose';
import { ToastController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Socket } from 'ng-socket-io';

import { GooglePlus } from '@ionic-native/google-plus';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {


  displayName: any;
  email: any;
  familyName: any;
  givenName: any;
  userId: any;
  imageUrl: any;

  isLoggedIn:boolean = false;

  public mirro_config = "";
  public windows_bright = 100;
  public windows_zoom = 100;
  public windows_off = true;

  constructor(
     public navCtrl: NavController,
     public http: Http,
     public toastCtrl: ToastController,
     public modalCtrl: ModalController,
     private socket: Socket,
     private googlePlus: GooglePlus) {


    this.socket.emit("hi", "hiiiiiiiii from application");

    let toast_error = this.toastCtrl.create({
      position: 'top',
      message: 'Sorry we have Problem to Connect the Server. Check your Connection or IP Address',
      duration: 4000,
      closeButtonText : "Close",
      cssClass:"nd_alertMsg"
    });
   
 

    this.getConfData();
        

  }// constructor



  login() {
    this.googlePlus.login({})
      .then(res => {
        console.log(res);
        this.displayName = res.displayName;
        this.email = res.email;
        this.familyName = res.familyName;
        this.givenName = res.givenName;
        this.userId = res.userId;
        this.imageUrl = res.imageUrl;

        this.isLoggedIn = true;
      })
      .catch(err => console.error(err));
  }

  logout() {
    this.googlePlus.logout()
      .then(res => {
        console.log(res);
        this.displayName = "";
        this.email = "";
        this.familyName = "";
        this.givenName = "";
        this.userId = "";
        this.imageUrl = "";

        this.isLoggedIn = false;
      })
      .catch(err => console.error(err));
  }





  btnauthgoolge(){
    this.googlePlus.login({})
    .then(res =>{
      console.log(res)
      alert(res);
    } )
    .catch(err => console.error(err));
  }

  
  btn_quitMirorr(){
    this.http.get('http://localhost:3000/quitMirror').map(res => res.json()).subscribe(
        data => {
          console.log(data);  
        },err => {
          //this.toast_error.present();
        }
    );
  }

  btn_reloadMirorr(){
    this.http.get('http://localhost:3000/reloadMirror').map(res => res.json()).subscribe(
        data => {
          console.log(data);  
        },err => {
          //this.toast_error.present();
        }
    );
  }

  openModal(_location){
    let modulePostion = []
    this.mirro_config["modulePostion"].forEach((val,index)=>{
      if(val.postion == _location ){
        modulePostion.push(val);
      }
    });
    let myModal = this.modalCtrl.create(ModuleChosePage,{'Param': {"location":_location,"postion":modulePostion,"data":this.mirro_config['modulee']}});

    myModal.onDidDismiss(data => {
     console.log(data);
     //this.mirro_config = data.conf
     this.getConfData();
   });

    myModal.present();

  }

  getConfData(){
      this.http.get('http://localhost:3000/conf').map(res => res.json()).subscribe(
        data => {

          data['modulee'].forEach(function(index){
          //  console.log(index)
          })
          //console.log(data)
          this.mirro_config = data

        
        },err => {
          //this.toast_error.present();
        }
    );
  }


  changeBright(){

    console.log((this.windows_bright / 100))
    this.socket.emit("changeBright", (this.windows_bright / 100));
  
  }

  changeZoom(){

    console.log((this.windows_zoom / 100))
    this.socket.emit("changeZoom", (this.windows_zoom / 100));
  
  }

  changeOff(){
    console.log(this.windows_off)
    this.socket.emit("windows_off", this.windows_off);
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }


}
