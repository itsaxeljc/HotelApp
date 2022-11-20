import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NuevoHuespedPage } from './nuevo-huesped.page';

const routes: Routes = [
  {
    path: '',
    component: NuevoHuespedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NuevoHuespedPageRoutingModule {}
