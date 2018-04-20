import { Component } from '@angular/core';
import { NavController,ModalController, NavParams } from 'ionic-angular';


import { ModuleChosePage } from '../modals/module-chose/module-chose';

import { ToastController } from 'ionic-angular';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public mirro_config = "";

  constructor(
     public navCtrl: NavController,
     public http: Http,
     public toastCtrl: ToastController,
     public modalCtrl: ModalController) {

    let toast_error = this.toastCtrl.create({
      position: 'top',
      message: 'Sorry we have Problem to Connect the Server. Check your Connection or IP Address',
      duration: 4000,
      closeButtonText : "Close",
      cssClass:"nd_alertMsg"
    });
   

    this.getConfData();
        

  }// constructor


  openBasicModal() {
    /*let myModal = this.modalCtrl.create(ModuleChosePage);
    myModal.present();*/

    



  }






  openModalWithParams() {
    let myModal = this.modalCtrl.create(ModuleChosePage, { 'myParam': ["asd","asdas","asdasd12435"] });
    myModal.present();
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
          this.toast_error.present();
        }
    );
  }
  

}
