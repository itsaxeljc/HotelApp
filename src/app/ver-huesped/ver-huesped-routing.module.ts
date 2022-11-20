import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerHuespedPage } from './ver-huesped.page';

const routes: Routes = [
  {
    path: '',
    component: VerHuespedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerHuespedPageRoutingModule {}
