import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResumenAnualPageRoutingModule } from './resumen-anual-routing.module';

import { ResumenAnualPage } from './resumen-anual.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResumenAnualPageRoutingModule
  ],
  declarations: [ResumenAnualPage]
})
export class ResumenAnualPageModule {}
