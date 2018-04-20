import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,Platform,AlertController  } from 'ionic-angular';
import * as $ from 'jquery'
/**
 * Generated class for the ModuleChosePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
@IonicPage()
@Component({
  selector: 'page-module-chose',
  templateUrl: 'module-chose.html',
})
export class ModuleChosePage {

  isAndroid: boolean = false;

  public moduleList = [];
  public moduleChose = [];
  public t1 = [];
  public moduleAppend = [];

  constructor(private alertCtrl: AlertController,public http: Http,platform: Platform,public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,) {
    //console.log( navParams.get('Param') )
    this.isAndroid = platform.is('android');

    this.moduleList   = navParams.get('Param').data;
    this.moduleAppend = navParams.get('Param').postion;
    //clear moduleAppend

   
    //$('body .box_list_cardModule').toggleClass('animated flipInX')

    //this.t1 = this.moduleList[1];
    //console.log(this.t1)
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad ModuleChosePage');
  }

  dismiss() {
    let data = { 'foo': this.moduleChose };
    this.viewCtrl.dismiss(data);
  }


  moduleChoseChanged(){
    let  index = this.moduleList.findIndex(el => el.name==this.moduleChose);
    this.t1 = this.moduleList[index]
  }


  btn_addNweModule(){
    console.log("akjsdlkja")
  }

  btn_delateModule(_module){
      let alert = this.alertCtrl.create({
        title: 'Remove Module '+_module.moduleName,
        message: 'Are you sure you want remove "'+_module.moduleName+'" Module from this location?',
        buttons: [
          {
            text: 'no',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'yes',
            handler: () => {
              console.log('Buy clicked');
              this.fn_removeModule(_module)
            }
          }
        ]
      });
      alert.present();
  }

  fn_removeModule(_module){

    $('.moduleCarde').removeClass('animated  flipInX ').addClass('animated  flipOutX')
    this.http.post('http://localhost:3000/removeModule', { 'id': _module._id,'location':this.navParams.get('Param').location }).map(res => res.json()).subscribe(
          data => {
            console.log(data)
            if(data["is"]){
              //for animation
              setTimeout(() => {
                this.moduleAppend = [];
                this.moduleAppend = data['moduleList']
              }, 1000);
            
            }
          },err => {
            //toast_error.present();
            console.log(err)
          }
      );
  }



  btn_visibilityChange(_module){
    $('.moduleCarde').removeClass('animated  flipInX ').addClass('animated  flipOutX')
    this.http.post('http://localhost:3000/visibility', { 'id': _module._id,'location':this.navParams.get('Param').location,'visibility':_module.visibility }).map(res => res.json()).subscribe(
        data => {
          console.log(data)
          if(data["is"]){
            //for animation
            setTimeout(() => {
              this.moduleAppend = [];
              this.moduleAppend = data['moduleList']
            }, 1000);
          
          }
        },err => {
          //toast_error.present();
          console.log(err)
        }
    );


  }

}


