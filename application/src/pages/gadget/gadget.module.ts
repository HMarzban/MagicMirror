import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GadgetPage } from './gadget';

@NgModule({
  declarations: [
    GadgetPage,
  ],
  imports: [
    IonicPageModule.forChild(GadgetPage),
  ],
})
export class GadgetPageModule {}
