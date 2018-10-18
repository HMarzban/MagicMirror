import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,App  } from 'ionic-angular';

import {EntryPage} from "../entry/entry"

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  constructor(public appCtrl: App,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  LogOut(){
    localStorage.removeItem("ServerRemoteAddress");

    //this.navCtrl.setRoot( EntryPage );
    this.appCtrl.getRootNav().setRoot(EntryPage);
  }

}
