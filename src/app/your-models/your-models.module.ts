import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { YourModelsPageRoutingModule } from './your-models-routing.module';

import { YourModelsPage } from './your-models.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    YourModelsPageRoutingModule
  ],
  declarations: [YourModelsPage]
})
export class YourModelsPageModule {}
