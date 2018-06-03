import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;


  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      localStorage.setItem("isLogin",'true')
      this.fn_authGuard();
    });

    /*platform.ready().then(() => {
        platform.pause.subscribe(() => {
            console.log('[INFO] App paused');
        });

        platform.resume.subscribe(() => {
            console.log('[INFO] App resumed');
        });
    });*/

  }//constructor
  fn_authGuard(){

    let auth = localStorage.getItem("isLogin")
    if(auth!=null){
      console.log("Auth Guard is ready")
      this.rootPage = TabsPage;
    }else if(auth=='true'){
      console.log("Auth Guard is not ready")
      this.rootPage = LoginPage;
    }else{
      localStorage.getItem("isLogin")
    }


  }
}
