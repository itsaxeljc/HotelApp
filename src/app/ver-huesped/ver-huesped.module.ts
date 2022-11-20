import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerHuespedPageRoutingModule } from './ver-huesped-routing.module';

import { VerHuespedPage } from './ver-huesped.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerHuespedPageRoutingModule
  ],
  declarations: [VerHuespedPage]
})
export class VerHuespedPageModule {}
