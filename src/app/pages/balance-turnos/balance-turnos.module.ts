import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BalanceTurnosPageRoutingModule } from './balance-turnos-routing.module';

import { BalanceTurnosPage } from './balance-turnos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BalanceTurnosPageRoutingModule
  ],
  declarations: [BalanceTurnosPage]
})
export class BalanceTurnosPageModule {}
