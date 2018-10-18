import { Component } from '@angular/core';
import { NavController,ModalController, AlertController } from 'ionic-angular';
import { ModuleChosePage } from '../modals/module-chose/module-chose';
import { ToastController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Socket } from 'ng-socket-io';
//import { GooglePlus } from '@ionic-native/google-plus';
//import { DeviceAccounts } from '@ionic-native/device-accounts';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  isLoggedIn:boolean = false;
  public Brightness_off = false;
  public mirro_config = "";
  public windows_bright = 100;
  public windows_zoom = 100;
  public windows_off = true;
  public emailDevice = "";
  public settings;

  constructor(
      public navCtrl: NavController,
      public http: Http,
      public toastCtrl: ToastController,
      public modalCtrl: ModalController,
      private socket: Socket,
      private alertCtrl: AlertController,
      //private googlePlus: GooglePlus,
      //private deviceAccounts: DeviceAccounts
    
     ) {

    this.settings = JSON.parse( localStorage.getItem("ServerRemoteAddress"))
    this.socket.emit("hi", "hiiiiiiiii from application");

    this.getConfData();

    this.listenSmartSensore();

  }// constructor


  listenSmartSensore(){
    console.log("listen")
  } //@Function: listenSmartSensore()


  /*login() {
    this.googlePlus.login({
      'webClientId': '7082203431-pdhtem28r45ula08n3f7ta1ejl7h4lcv.apps.googleusercontent.com'
    })
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
  }*/

  /*logout() {
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
  }*/





  /*btnauthgoolge(){

    this.deviceAccounts.get()
      .then(accounts => console.log(accounts))
      .catch(error => console.error(error));

    this.deviceAccounts.getEmail()
    .then(emailacount =>{

      console.log(emailacount);
      alert(emailacount)
      this.emailDevice = emailacount;


    })
    .catch(error => {
      console.error(error);
      this.emailDevice = error;

    });

  }*/

  btn_quitMirorr(){
    this.http.get(`${this.settings["ipAddress"]}/quitMirror`).map(res => res.json()).subscribe(
        data => {
          console.log(data);
        },err => {
          this.alert( {title:"Server connection", msg:"We can not connect to server please check your connection with server then try again."})
        }
    );
  } //@Function: btn_quitMirorr()

  btn_reloadMirorr(){
    this.http.get(`${this.settings["ipAddress"]}/reloadMirror`).map(res => res.json()).subscribe(
        data => {
          console.log(data);
        },err => {
          this.alert( {title:"Server connection", msg:"We can not connect to server please check your connection with server then try again."})
        }
    );
  } //@Function: btn_reloadMirorr()

  openModal(_location){
    let modulePostion = []
    console.log(this.mirro_config["modulePostion"])
    this.mirro_config["modulePostion"].forEach((val,index)=>{
      if(val.postion == _location )
        modulePostion.push(val);
    });
    let myModal = this.modalCtrl.create(ModuleChosePage,{'Param': {"location":_location,"postion":modulePostion,"data":this.mirro_config['modulee']}});
    myModal.onDidDismiss(data => {
     console.log(data);
     this.getConfData();
   });
    myModal.present();
  } //@Function: openModal()


  alert( data:any ) {
    let alert = this.alertCtrl.create({
      title: data.title,
      subTitle: data.msg,
      buttons: [
        {
          text: 'Try Again',
          role: 'Dismiss',
          handler: () => {
            window.location.reload();
          }
        }
      ]
    });
    alert.present();
  } //@Function: alert()

  getConfData(){
      this.http.get(`${this.settings["ipAddress"]}/conf`)
      .map(res => res.json())
      .subscribe(
        data => {
          this.mirro_config = data
        },err => {
          this.alert( {title:"Server connection", msg:"We can not connect to server please check your connection with server then try again."})
        }
    );
  } //@Function: getConfData()


  changeBright(){
    console.log((this.windows_bright / 100))
    this.socket.emit("changeBright", (this.windows_bright / 100));
  } //@Function: changeBright()

  changeZoom(){
    console.log((this.windows_zoom / 100))
    this.socket.emit("changeZoom", (this.windows_zoom / 100));
  } //@Function: changeZoom()

  changeOff(){
    console.log(this.windows_off)
    this.socket.emit("windows_off", this.windows_off);
  } //@Function: changeOff()

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  } //@Function: doRefresh()


} //@Class: HomePage()
