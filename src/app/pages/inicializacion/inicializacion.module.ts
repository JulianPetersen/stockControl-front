import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InicializacionPageRoutingModule } from './inicializacion-routing.module';

import { InicializacionPage } from './inicializacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InicializacionPageRoutingModule
  ],
  declarations: [InicializacionPage]
})
export class InicializacionPageModule {}
