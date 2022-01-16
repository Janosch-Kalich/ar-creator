import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { YourModelsPage } from './your-models.page';

const routes: Routes = [
  {
    path: '',
    component: YourModelsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class YourModelsPageRoutingModule {}
