import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TurnosCompletoPageRoutingModule } from './turnos-completo-routing.module';

import { TurnosCompletoPage } from './turnos-completo.page';
import { TabsPage } from '../tabs/tabs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TurnosCompletoPageRoutingModule
    
  ],
  declarations: [TurnosCompletoPage]
})
export class TurnosCompletoPageModule {}
