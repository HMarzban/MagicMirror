import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModuleChosePage } from './module-chose';

@NgModule({
  declarations: [
    ModuleChosePage,
  ],
  imports: [
    IonicPageModule.forChild(ModuleChosePage),
  ],
})
export class ModuleChosePageModule {}
