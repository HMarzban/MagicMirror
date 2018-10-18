import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';

import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { ProfilePage } from '../pages/profile/profile';
import { GadgetPage } from '../pages/gadget/gadget';

import { EntryPage } from '../pages/entry/entry';

import { ModuleChosePage } from '../pages/modals/module-chose/module-chose';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HTTP } from '@ionic-native/http';

import { HttpModule } from '@angular/http';

import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';

import { GooglePlus } from '@ionic-native/google-plus';

import { DeviceAccounts } from '@ionic-native/device-accounts';

import { EscapeHtmlPipe } from './../pipes/keep-html.pipe';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    HomePage,
    TabsPage,
    LoginPage,
    EntryPage,
    ModuleChosePage,
    ProfilePage,
    GadgetPage,
    EscapeHtmlPipe
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    SocketIoModule.forRoot(config)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    HomePage,
    TabsPage,
    LoginPage,
    EntryPage,
    ModuleChosePage,
    ProfilePage,
    GadgetPage
  ],
  providers: [
    HTTP,
    StatusBar,
    SplashScreen,
    GooglePlus ,
    DeviceAccounts,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
