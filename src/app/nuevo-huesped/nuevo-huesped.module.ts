import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NuevoHuespedPageRoutingModule } from './nuevo-huesped-routing.module';

import { NuevoHuespedPage } from './nuevo-huesped.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    NuevoHuespedPageRoutingModule,
  ],
  declarations: [NuevoHuespedPage],
})
export class NuevoHuespedPageModule {}
