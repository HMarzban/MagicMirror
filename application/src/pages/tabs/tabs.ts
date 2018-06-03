import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { AboutPage } from '../about/about';
import { HomePage } from '../home/home';
import { ProfilePage } from '../profile/profile';
import { GadgetPage } from '../gadget/gadget';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {


  tabHome = HomePage;
  tabGadget = GadgetPage
  tabProfile = ProfilePage
  tab2About = AboutPage;

  isAndroid: boolean = false;

  constructor(platform: Platform) {
    this.isAndroid = platform.is('android');
  }
}
